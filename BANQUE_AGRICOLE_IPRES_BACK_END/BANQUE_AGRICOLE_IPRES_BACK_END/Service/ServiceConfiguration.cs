using System;
using System.Configuration;
using IpresDB.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using TodoApp.Configuration;

namespace BANQUE_AGRICOLE_IPRES_BACK_END.Service
{
    public static class ServiceConfiguration
    {
       

       

        public static void ConfigureIdentity(this IServiceCollection services)
        {
            //var builder = services.AddIdentityCore<User>(u => u.User.RequireUniqueEmail = true);
            //builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), services);
            //builder.AddRoles<IdentityRole>().AddEntityFrameworkStores<IpresDBContext>();

            services.AddIdentity<IdentityUser,IdentityRole>(options =>
                       options.SignIn.RequireConfirmedAccount = true)
                       .AddEntityFrameworkStores<IpresDBContext>();

        }
       
    }
}

