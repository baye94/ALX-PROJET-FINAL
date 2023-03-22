using System;
using System.Collections.Generic;

namespace Models
{
    public partial class DetailAgent
    {
        public string Id { get; set; } = null!;
        public string Num { get ; set ; } = "";
        public string IdUser { get; set; } = null!;
        public string ? IdGuichet { get; set; }
        public string Nom { get; set; } = null!;
        public string Prenom { get; set; } = null!;
        public int Status {get;set;}
    }
}
