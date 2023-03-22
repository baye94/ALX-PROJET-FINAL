using System;
using System.Collections.Generic;
using BANQUE_AGRICOLE_IPRES_BACK_END.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;

namespace IpresDB.Data
{
    public partial class IpresDBContext : IdentityDbContext
    {
        public IpresDBContext()
        {
        }

        public IpresDBContext(DbContextOptions<IpresDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Agence> Agences { get; set; } = null!;
        public virtual DbSet<DetailAnnulationPaiement> DetailPaiements { get; set; } = null!;
        public virtual DbSet<DetailPensionnaireFichier> DetailPensionnaireFichiers { get; set; } = null!;
        public virtual DbSet<FichierPaiement> FichierPaiements { get; set; } = null!;
        public virtual DbSet<Guichet> Guichets { get; set; } = null!;
        public virtual DbSet<Paiement> Paiements { get; set; } = null!;
        public virtual DbSet<Pensionnaire> Pensionnaires { get; set; } = null!;
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; } = null!;
        public virtual DbSet<DetailUserGuichet> DetailUserGuichets { get; set; } = null!;
        public virtual DbSet<DetailAgent> DetailAgents { get; set; } = null!;
        public virtual DbSet<Partenaire> Partenaires { get; set; } = null!;
        public virtual DbSet<Journalisation> Journalisations { get; set; } = null!;
        public virtual DbSet<ParametrageFichier> ParametrageFichiers { get; set; } = null!;
        public virtual DbSet<DetailPartenaireAgence> DetailPartenaireAgences { get; set; } = null!;
        public virtual DbSet<Horaires> Horaires { get; set; } = null!;
        public virtual DbSet<Message> Messages {get; set;} = null!;
        public virtual DbSet<DetailAnnulationPaiement> DetailAnnulationPaiements { get; set; } = null! ;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8_general_ci")
                .HasCharSet("utf8");
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Agence>(entity =>
            //{
            //    entity.ToTable("agence");

            //    entity.Property(e => e.Id).HasColumnName("id");

            //    entity.Property(e => e.Adresse)
            //        .HasMaxLength(255)
            //        .HasColumnName("adresse");

            //    entity.Property(e => e.Libelle)
            //        .HasMaxLength(255)
            //        .HasColumnName("libelle");

            //    entity.Property(e => e.Montant).HasColumnName("montant");

            //    entity.Property(e => e.MontantPaiement).HasColumnType("int(11)");

            //    entity.Property(e => e.Taux).HasColumnName("taux");

            //    entity.Property(e => e.Type)
            //        .HasColumnType("enum('partenaire','banque_agricole')")
            //        .HasColumnName("type");
            //});

            //modelBuilder.Entity<DetailPaiement>(entity =>
            //{
            //    entity.ToTable("detailPaiement");

            //    entity.HasIndex(e => e.Iduser, "iduser");

            //    entity.HasIndex(e => e.MatriculePenssionnaire, "matriculePenssionnaire");

            //    entity.Property(e => e.Id).HasColumnName("id");

            //    entity.Property(e => e.Iduser).HasColumnName("iduser");

            //    entity.Property(e => e.MatriculePenssionnaire).HasColumnName("matriculePenssionnaire");

            //    entity.Property(e => e.MotifAnnulation)
            //        .HasColumnType("text")
            //        .HasColumnName("motif_annulation");

            //    entity.Property(e => e.Status)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("status");
            //});

            //modelBuilder.Entity<DetailPensionnaireFichier>(entity =>
            //{
            //    entity.ToTable("detail_pensionnaire_fichier");

            //    entity.HasIndex(e => e.IdFichier, "id_fichier");

            //    entity.HasIndex(e => e.MatriculePensionnaire, "matricule_pensionnaire");

            //    entity.Property(e => e.Id).HasColumnName("id");

            //    entity.Property(e => e.IdFichier).HasColumnName("id_fichier");

            //    entity.Property(e => e.MatriculePensionnaire).HasColumnName("matricule_pensionnaire");
            //});

            //modelBuilder.Entity<FichierPaiement>(entity =>
            //{
            //    entity.ToTable("fichier_paiement");

            //    entity.Property(e => e.Id).HasColumnName("id");

            //    entity.Property(e => e.DateAjout).HasColumnName("date_ajout");

            //    entity.Property(e => e.DatePourPaiement).HasColumnName("date_pour_paiement");

            //    entity.Property(e => e.Nom)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("nom");

            //    entity.Property(e => e.Url)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("url");
            //});

            //modelBuilder.Entity<Guichet>(entity =>
            //{
            //    entity.ToTable("guichet");

            //    entity.HasIndex(e => e.IdAgence, "idAgence");

            //    entity.Property(e => e.Id).HasColumnName("id");

            //    entity.Property(e => e.IdAgence).HasColumnName("idAgence");

            //    entity.Property(e => e.Libelle)
            //        .HasMaxLength(255)
            //        .HasColumnName("libelle");

            //    entity.Property(e => e.MontantPaiement).HasColumnType("int(11)");
            //});

            //modelBuilder.Entity<Paiement>(entity =>
            //{
            //    entity.ToTable("paiement");

            //    entity.HasIndex(e => e.IdUser, "idUser");

            //    entity.HasIndex(e => e.MatriculePensionnaire, "matriculePensionnaire");

            //    entity.Property(e => e.Id).HasColumnName("id");

            //    entity.Property(e => e.DateCreation)
            //        .HasColumnType("datetime")
            //        .HasColumnName("date_creation");

            //    entity.Property(e => e.DateModification)
            //        .HasColumnType("datetime")
            //        .HasColumnName("date_modification");

            //    entity.Property(e => e.IdUser).HasColumnName("idUser");

            //    entity.Property(e => e.MatriculePensionnaire).HasColumnName("matriculePensionnaire");

            //    entity.Property(e => e.Montant)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("montant");

            //    entity.Property(e => e.MotifAnnulation)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("motif_annulation");

            //    entity.Property(e => e.Statut)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("statut");
            //});

            //modelBuilder.Entity<Pensionnaire>(entity =>
            //{
            //    entity.ToTable("pensionnaire");

            //    entity.Property(e => e.AssuranceRetenu)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("assurance_retenu");

            //    entity.Property(e => e.AvanceTabaski)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("avance_tabaski");

            //    entity.Property(e => e.AvanceTiers)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("avance_tiers");

            //    entity.Property(e => e.Categories)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("categories");

            //    entity.Property(e => e.Cms)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("cms");

            //    entity.Property(e => e.DateCreation)
            //        .HasColumnType("datetime")
            //        .HasColumnName("date_creation");

            //    entity.Property(e => e.DateModification)
            //        .HasColumnType("datetime")
            //        .HasColumnName("date_modification");

            //    entity.Property(e => e.Hospitalisation)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("hospitalisation");

            //    entity.Property(e => e.Impot)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("impot");

            //    entity.Property(e => e.Nom)
            //        .HasMaxLength(255)
            //        .HasColumnName("nom");

            //    entity.Property(e => e.Pension)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("pension");

            //    entity.Property(e => e.Prenom)
            //        .HasMaxLength(255)
            //        .HasColumnName("prenom");

            //    entity.Property(e => e.Regime)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("regime");

            //    entity.Property(e => e.RetenuTabaski)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("retenu_tabaski");

            //    entity.Property(e => e.SalaireBrut)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("salaire_brut");

            //    entity.Property(e => e.SalaireNet)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("salaire_net");

            //    entity.Property(e => e.StatusPaiement)
            //        .HasColumnType("int(11)")
            //        .HasColumnName("status_paiement");
            //});

            //modelBuilder.Entity<RefreshToken>(entity =>
            //{
            //    entity.ToTable("RefreshToken");

            //    entity.HasIndex(e => e.UserId, "UserId");

            //    entity.Property(e => e.Id).HasColumnType("int(11)");

            //    entity.Property(e => e.AddedDate).HasColumnType("datetime");

            //    entity.Property(e => e.ExpiryDate).HasColumnType("datetime");

            //    entity.Property(e => e.JwtId).HasMaxLength(255);

            //    entity.Property(e => e.Token).HasMaxLength(255);

            //    entity.HasOne(d => d.User)
            //        .WithMany(p => p.RefreshTokens)
            //        .HasForeignKey(d => d.UserId)
            //        .OnDelete(DeleteBehavior.ClientSetNull)
            //        .HasConstraintName("refreshtoken_ibfk_1");
            //});

            //modelBuilder.Entity<User>(entity =>
            //{
            //    entity.ToTable("users");

            //    entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            //    entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
            //        .IsUnique();

            //    entity.HasIndex(e => e.Idguichet, "idguichet");

            //    entity.Property(e => e.Id).HasColumnName("id");

            //    entity.Property(e => e.AccessFailedCount).HasColumnType("int(11)");

            //    entity.Property(e => e.Email).HasMaxLength(256);

            //    entity.Property(e => e.Idguichet).HasColumnName("idguichet");

            //    entity.Property(e => e.LockoutEnd).HasMaxLength(6);

            //    entity.Property(e => e.Nom)
            //        .HasMaxLength(200)
            //        .HasColumnName("nom");

            //    entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

            //    entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

            //    entity.Property(e => e.Prenom)
            //        .HasMaxLength(200)
            //        .HasColumnName("prenom");

            //    entity.Property(e => e.UserName).HasMaxLength(256);
            //});

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
