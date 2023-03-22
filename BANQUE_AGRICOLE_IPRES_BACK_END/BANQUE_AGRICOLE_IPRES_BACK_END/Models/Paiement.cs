using System;
using System.Collections.Generic;
using Models;

namespace IpresDB
{
    public partial class Paiement

    {
        public string Id { get; set; } = null!;
        public string Evenement { get; set; } = null!;
        public int Montant { get; set; }
        public int Statut { get; set; }
        public string? MotifAnnulation { get; set; }
        public string Cni { get; set; } = null!;
        public string DateCreation { get; set; } = null!;
        public string DateModification { get; set; } = null!;
        public string IdUser { get; set; } = null!;
        public string IdGuichet { get; set; } = null!;
        public string MatriculePensionnaire { get; set; } = null!;
        public string DatePaiement { get; set; } = null!;

       
    }
}
