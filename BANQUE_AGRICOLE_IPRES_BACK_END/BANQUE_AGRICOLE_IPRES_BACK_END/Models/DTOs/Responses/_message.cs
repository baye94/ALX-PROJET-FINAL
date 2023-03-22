using IpresDB;

namespace Models
{
    public partial class _message: Message
    {
        public _message()
        {
        }
      
        public string agent { get; set; } = null!;
        public string paiement { get; set; } = null!;
        public List<MessagePaiementDetail> paiements {get; set;} = null!;
      
    }

     public partial class MessagePaiementDetail: Paiement
    {
        public MessagePaiementDetail()
        {
        }
      
        public string nom {get ; set; }= null!;
         public string prenom {get ; set; }= null!;
        public string num { get ; set;} = null!;
        public string Guichetnum { get ; set;} = null!;
        public string Guichetlibelle { get ; set;} = null!;


      
    }
}