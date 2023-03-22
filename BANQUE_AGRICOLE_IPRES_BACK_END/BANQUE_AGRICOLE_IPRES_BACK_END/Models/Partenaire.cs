using System;
namespace Models
{
    public class Partenaire
    {
        public Partenaire()
        {

        }
        public string Id { get; set; } = "id";
        public string Num { get; set; }  = "num";
        public string Libelle { get; set; }= null!;
        public string Adresse { get; set ; }= null!;
        public int Taux { get; set; }
        public int Status { get ; set;}
        public string DateCreation { get; set;} = "num";
        public string DateUpdate { get; set;} = "num";
    }
}

