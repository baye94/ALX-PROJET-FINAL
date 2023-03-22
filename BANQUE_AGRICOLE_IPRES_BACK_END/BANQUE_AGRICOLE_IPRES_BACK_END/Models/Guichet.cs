using System;
using System.Collections.Generic;

namespace Models
{
    public partial class Guichet
    {
        public Guichet()
        {
            //DetailUserGuichets = new HashSet<DetailUserGuichet>();
        }

        public string Id { get; set; } = "id";
        public string NumGuichet { get; set; } = "";
        public string Libelle { get; set; } = null!;
        public string IdAgence { get; set; } = null!;
        public string DateCreate { get; set; } = null!;
        public string DateUpdate { get; set;} = null!;
        public int Status { get; set;} 

        //public virtual Agence IdAgenceNavigation { get; set; } = null!;
        //public virtual ICollection<DetailUserGuichet> DetailUserGuichets { get; set; }
    }
}
