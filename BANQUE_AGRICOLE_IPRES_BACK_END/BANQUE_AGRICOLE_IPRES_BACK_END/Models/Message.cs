namespace Models
{
    public partial class Message
    {
        public Message()
        {
        }
        public string Id { get; set; } = null!;
        public string Motif { get; set; } = null!;
        public string IdAgent { get; set; } = null!;
        public string IdPaiement { get; set; } = null!;
        public string Date { get; set; } = "";
    }
}