using System;
using System.Collections.Generic;

namespace Models
{
    public partial class DetailAnnulationPaiement
    {
        public string Id { get; set; } = null!;

        public string MotifAnnulation { get; set; } = null!;
        public string IdUser { get; set; } = null!;
        public string IdPaiement { get; set; } = null!;
        public string IdDemandeur { get; set; } = null!;
    }
}
