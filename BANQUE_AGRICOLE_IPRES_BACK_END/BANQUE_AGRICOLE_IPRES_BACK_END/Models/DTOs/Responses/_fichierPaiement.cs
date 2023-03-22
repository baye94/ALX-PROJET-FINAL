using System;
namespace Models
{
    public  partial class _fichierPaiement : FichierPaiement
    {
        public _fichierPaiement()
        {

        }
        public string nomUser { get; set; } = null!;
        public string prenom { get; set; } = null!;
        public string num { get; set; } = null!;



    }
}

