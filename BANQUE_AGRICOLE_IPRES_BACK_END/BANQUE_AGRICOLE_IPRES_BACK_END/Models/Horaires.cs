namespace Models
{
    public partial  class Horaires
    {
        public Horaires()
        {
        }
         public string  Id { get; set; } = null!;
        public string? Ouverture { get; set; } 
        public string? Fermeture { get; set; }
       
    }
}