
namespace Models
{
    public partial class ParametrageFichier
    {
        public  ParametrageFichier()
        {

        }

        public int Id { get; set; }
        public string Colonne { get; set; } = null!;
        public int  Demarre { get; set; } 
        public int Largeur { get ; set;}

    }

}
