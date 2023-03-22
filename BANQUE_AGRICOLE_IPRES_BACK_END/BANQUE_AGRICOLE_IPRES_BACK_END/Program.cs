using System.Text;
using BANQUE_AGRICOLE_IPRES_BACK_END.Models;
using BANQUE_AGRICOLE_IPRES_BACK_END.Service;
using IpresDB.Data;
//using BANQUE_AGRICOLE_IPRES_BACK_END.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using Configuration;

var builder = WebApplication.CreateBuilder(args);
// authentification jwt
ConfigurationManager configuration = builder.Configuration; // allows both to access and to set up the config

var logger = new LoggerConfiguration()
      .ReadFrom.Configuration(builder.Configuration)
      .Enrich.FromLogContext()
      .CreateLogger();
      builder.Logging.ClearProviders();
      builder.Logging.AddSerilog(logger);


      
builder.Services.Configure<JwtConfig>(configuration.GetSection("JwtConfig"));
var key = Encoding.ASCII.GetBytes(configuration["JwtConfig:Secret"]);

var tokenValidationParams = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = false,
    ValidateAudience = false,
    ValidateLifetime = true,
    RequireExpirationTime = false,
    ClockSkew = TimeSpan.Zero
};

builder.Services.AddSingleton(tokenValidationParams);

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(jwt => {

    jwt.SaveToken = true;
    jwt.TokenValidationParameters = tokenValidationParams;
});


// add cors
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                          
                      });
});

// end add cors
// Add services to the container.
builder.Services.AddControllers();
// add dbContext
builder.Services.AddDbContext<IpresDBContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("IpresDB");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)) ;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    // option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});//configurate Identity
builder.Services.ConfigureIdentity();

//configure autoMapper
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.Run();
