using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BANQUE_AGRICOLE_IPRES_BACK_END.Migrations
{
    public partial class MyFirstMigration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pension",
                table: "Pensionnaires");

            migrationBuilder.DropColumn(
                name: "StatusPaiement",
                table: "Pensionnaires");

            migrationBuilder.DropColumn(
                name: "Montant",
                table: "Agences");

            migrationBuilder.DropColumn(
                name: "Taux",
                table: "Agences");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Agences");

            migrationBuilder.AlterColumn<string>(
                name: "Regime",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci",
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AlterColumn<string>(
                name: "Hospitalisation",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci",
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AlterColumn<string>(
                name: "Cms",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci",
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AlterColumn<string>(
                name: "Categories",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci",
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "Age",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "Cp",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "DatePaiement",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "Dev",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "MatriculePensionnaire",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "Penali",
                table: "Pensionnaires",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AlterColumn<string>(
                name: "MotifAnnulation",
                table: "Paiements",
                type: "longtext",
                nullable: true,
                collation: "utf8_general_ci",
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AlterColumn<string>(
                name: "DateModification",
                table: "Paiements",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci",
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AlterColumn<string>(
                name: "DateCreation",
                table: "Paiements",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci",
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "Cni",
                table: "Paiements",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "DatePaiement",
                table: "Paiements",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "Evenement",
                table: "Paiements",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "AgenceId",
                table: "Guichets",
                type: "varchar(255)",
                nullable: true,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "FichierPaiements",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci",
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "FichierPaiements",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci",
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AlterColumn<string>(
                name: "DatePourPaiement",
                table: "FichierPaiements",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci",
                oldClrType: typeof(DateOnly),
                oldType: "date")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "IdUsers",
                table: "FichierPaiements",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.AddColumn<string>(
                name: "IdPartenaire",
                table: "Agences",
                type: "longtext",
                nullable: true,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");

            migrationBuilder.CreateTable(
                name: "DetailAgents",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    IdUser = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Nom = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Prenom = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailAgents", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.CreateTable(
                name: "DetailUserGuichets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    IdUser = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    IdGuichet = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailUserGuichets", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.CreateTable(
                name: "Journalisations",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    IdUsers = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Action = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Ip = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Mac = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    TimeStamp = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Journalisations", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.CreateTable(
                name: "ParametrageFichiers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Colonne = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Demarre = table.Column<int>(type: "int", nullable: false),
                    Largeur = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParametrageFichiers", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.CreateTable(
                name: "Partenaires",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Libelle = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Adresse = table.Column<string>(type: "longtext", nullable: false, collation: "utf8_general_ci")
                        .Annotation("MySql:CharSet", "utf8"),
                    Taux = table.Column<double>(type: "double", nullable: false),
                    Montant = table.Column<double>(type: "double", nullable: true),
                    MontantTotalPaiement = table.Column<double>(type: "double", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partenaires", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Guichets_AgenceId",
                table: "Guichets",
                column: "AgenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Guichets_Agences_AgenceId",
                table: "Guichets",
                column: "AgenceId",
                principalTable: "Agences",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guichets_Agences_AgenceId",
                table: "Guichets");

            migrationBuilder.DropTable(
                name: "DetailAgents");

            migrationBuilder.DropTable(
                name: "DetailUserGuichets");

            migrationBuilder.DropTable(
                name: "Journalisations");

            migrationBuilder.DropTable(
                name: "ParametrageFichiers");

            migrationBuilder.DropTable(
                name: "Partenaires");

            migrationBuilder.DropIndex(
                name: "IX_Guichets_AgenceId",
                table: "Guichets");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "Pensionnaires");

            migrationBuilder.DropColumn(
                name: "Cp",
                table: "Pensionnaires");

            migrationBuilder.DropColumn(
                name: "DatePaiement",
                table: "Pensionnaires");

            migrationBuilder.DropColumn(
                name: "Dev",
                table: "Pensionnaires");

            migrationBuilder.DropColumn(
                name: "MatriculePensionnaire",
                table: "Pensionnaires");

            migrationBuilder.DropColumn(
                name: "Penali",
                table: "Pensionnaires");

            migrationBuilder.DropColumn(
                name: "Cni",
                table: "Paiements");

            migrationBuilder.DropColumn(
                name: "DatePaiement",
                table: "Paiements");

            migrationBuilder.DropColumn(
                name: "Evenement",
                table: "Paiements");

            migrationBuilder.DropColumn(
                name: "AgenceId",
                table: "Guichets");

            migrationBuilder.DropColumn(
                name: "IdUsers",
                table: "FichierPaiements");

            migrationBuilder.DropColumn(
                name: "IdPartenaire",
                table: "Agences");

            migrationBuilder.AlterColumn<int>(
                name: "Regime",
                table: "Pensionnaires",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "Hospitalisation",
                table: "Pensionnaires",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "Cms",
                table: "Pensionnaires",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "Categories",
                table: "Pensionnaires",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AddColumn<int>(
                name: "Pension",
                table: "Pensionnaires",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StatusPaiement",
                table: "Pensionnaires",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "MotifAnnulation",
                table: "Paiements",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateModification",
                table: "Paiements",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreation",
                table: "Paiements",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "Url",
                table: "FichierPaiements",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "Nom",
                table: "FichierPaiements",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DatePourPaiement",
                table: "FichierPaiements",
                type: "date",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("Relational:Collation", "utf8_general_ci");

            migrationBuilder.AddColumn<double>(
                name: "Montant",
                table: "Agences",
                type: "double",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Taux",
                table: "Agences",
                type: "double",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Agences",
                type: "longtext",
                nullable: false,
                collation: "utf8_general_ci")
                .Annotation("MySql:CharSet", "utf8");
        }
    }
}
