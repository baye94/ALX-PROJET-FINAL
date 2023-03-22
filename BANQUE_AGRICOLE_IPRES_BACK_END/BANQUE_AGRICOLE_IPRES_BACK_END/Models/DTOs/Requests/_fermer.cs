using System;
using System.Collections.Generic;

namespace Models
{
    public partial class _fermer
    {
        public _fermer()
        {
        }


        public string IdUser { get; set; } = null!;
        public int status { get; set; }


    }

    public partial class _fermerGuichet
    {
        public _fermerGuichet()
        {
        }


        public string IdGuichet { get; set; } = null!;
        public int status { get; set; }


    }

     public partial class _fermerAgence
    {
        public _fermerAgence()
        {
        }


        public string IdAgence { get; set; } = null!;
        public int status { get; set; }


    }
}
