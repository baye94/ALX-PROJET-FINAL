
using System;
using System.Collections.Generic;
namespace Models
{
     public partial class GuichetAgence
    {
        public GuichetAgence()
        {
            //DetailUserGuichets = new HashSet<DetailUserGuichet>();
        }

        public string Id { get; set; } = "id";
        public string NumGuichet { get; set; } = "";
        public string Libelle { get; set; } = null!;
        public string IdAgence { get; set; } = null!;
        public string AgenceNum { get; set; } = null!;
        

        //public virtual Agence IdAgenceNavigation { get; set; } = null!;
        //public virtual ICollection<DetailUserGuichet> DetailUserGuichets { get; set; }
    }
}