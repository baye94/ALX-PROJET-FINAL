using IpresDB;

namespace Models
{
    public  partial class _paiementPartenaire:Paiement
{
    public _paiementPartenaire(){}
    public string user { get; set ;} = null!;
    public string guichet { get; set;} = null!;
    public string matricule { get; set;} = null!;   
    
}
}