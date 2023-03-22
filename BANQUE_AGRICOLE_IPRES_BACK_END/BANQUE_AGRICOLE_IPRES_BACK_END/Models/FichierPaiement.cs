using System;
using System.Collections.Generic;

namespace Models
{
    public partial class FichierPaiement
    {
        public string Id { get; set; } = null!;
        public string IdUsers { get; set; } = null!;
        public string Url { get; set; } = null!;
        public string Nom { get; set; } = null!;
        public string DateAjout { get; set; } = null!;
        public string DatePourPaiement { get; set; } = null!;
    }
}
