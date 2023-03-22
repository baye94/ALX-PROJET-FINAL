using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Agence
    {
        public Agence()
        {
            // Guichets = new HashSet<Guichet>();
        }

        public string Id { get; set; } = "id";
        public string NumAgence {get;set;} = "";
        public string Libelle { get; set; } = null!;
        public string Adresse { get; set; } = null!;
        public string DateCreate { get ; set; } = null!;
        public string DateUpdate {get ; set;} = null!;
        public int Status { get; set; }
        
        // [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        // public virtual ICollection<Guichet> Guichets { get; set; }
    }
}
