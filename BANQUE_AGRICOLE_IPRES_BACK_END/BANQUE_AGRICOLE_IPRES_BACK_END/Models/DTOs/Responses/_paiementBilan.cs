using IpresDB;

namespace Models
{
    public  partial class _paiementBilan:Paiement
{
    public _paiementBilan(){}
    public string? guichet { get; set ;} 
    public string? agence { get; set;} 
    public string? agent { get ; set; }
    public string ?  matricule  {get; set;}


   
    
}
}



//  if (partenaire != null)
//                 {
//                     foreach (var item in paiementData.Where(a => a.Id != null))
//                     {
//                         var dateToNum = Int32.Parse(item.DateCreation.Substring(0, 4) + item.DateCreation.Substring(5, 2) + item.DateCreation.Substring(8, 2));
//                          var user = await _ipresDBContext.DetailAgents.FirstOrDefaultAsync(u => u.IdUser == item.IdUser);
//                          montant = montant + item.Montant;
//                          var pensionnairedata = await _ipresDBContext.Pensionnaires.FirstOrDefaultAsync(p => p.Id == item.MatriculePensionnaire);                           
//                         if (dateToNum >= dateD && dateToNum <= dateF)
//                         {
                           
//                                     listPaiements.Add(new Paiement
//                                     {
//                                         // MontantTotal = montant,
//                                         Id = "",
//                                         Montant = item.Montant,
//                                         IdUser = "",
//                                         DateCreation = item.DateCreation,
//                                         DateModification = item.DateModification,
//                                         Statut = item.Statut,
//                                         Evenement = item.Evenement,
//                                         MatriculePensionnaire = " ",
//                                         Cni = item.Cni,
//                                         DatePaiement = item.DatePaiement,


//                                     });
                            
//                         }

//                     }

//                 }