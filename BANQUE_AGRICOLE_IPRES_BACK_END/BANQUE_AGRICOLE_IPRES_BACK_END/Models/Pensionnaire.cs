using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Pensionnaire
    {
        public Pensionnaire()
        {
            //Paiements = new HashSet<Paiement>();
        }

        public string Id { get; set; } = null!;
        public string MatriculePensionnaire { get; set; } = null!;
        public string Nom { get; set; } = null!;
        public string Prenom { get; set; } = null!;
        public int SalaireNet { get; set; } 
        public string Categories { get; set; }  = null!;
        public string Regime { get; set; }  = null!;
        public int SalaireBrut { get; set; } 
        public int AvanceTabaski { get; set; }  
        public int Impot { get; set; }
        public string Cms { get; set; }  = null!;
        public int RetenuTabaski { get; set; } 
        public int AvanceTiers { get; set; }  
        public string Hospitalisation { get; set; }  = null!;
        public int AssuranceRetenu { get; set; } 
        public string Penali { get; set; } = null!;
        public string Age {get;set;} = null!;
        public string Dev { get; set; } = null!;
        public string Cp { get; set; } = null!;
        public DateTime DateCreation { get; set; } 
        public DateTime DateModification { get; set; } 
        public string DatePaiement { get; set; } = null!;

        public static implicit operator string?(Pensionnaire? v)
        {
            throw new NotImplementedException();
        }

        //public virtual ICollection<Paiement> Paiements { get; set; }
    }
}
