using System;
using System.Collections.Generic;

namespace Models
{
    public partial class _pensionnaire
    {
        public _pensionnaire()
        {      
        }

       
        public string MatriculePensionnaire { get; set; } = null!;
        public string Nom { get; set; } = null!;
        public string Prenom { get; set; } = null!;
       
    }
}
