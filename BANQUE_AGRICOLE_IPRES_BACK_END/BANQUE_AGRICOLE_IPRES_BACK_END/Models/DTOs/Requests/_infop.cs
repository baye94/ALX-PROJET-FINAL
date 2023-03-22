using System.ComponentModel.DataAnnotations;
using BANQUE_AGRICOLE_IPRES_BACK_END.Models.DTOs.Requests;
using IpresDB.Data;
using Microsoft.AspNetCore.Identity;

namespace Models.DTOs.Requests
{
    public partial class _infop
    {
        public _infop()
        {      
        }
         public string Id { get; set; } = null!;

        [Required]
        public string Prenom { get; set; } = null!;
        [Required]
        [Phone]
        public string Telephone { get; set; } = null!;
        [Required]
        public string Nom { get; set; } = null!;
        [Required]
         public string Num { get; set; } = null!;
       
    
    }
}