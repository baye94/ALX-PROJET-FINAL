using System;
namespace Models
{
    public partial class _journalisation 
    {
         public _journalisation(){}
          public string date {get ; set;} = null!;
          public List<_journalisationAction> actions { get ; set;} = null!;
        


    }



    public partial class _journalisationAction
    {
        public _journalisationAction() { }
    
        public string action { get; set; } = null!;
        public string heure { get; set; } = null!;

    }


}

