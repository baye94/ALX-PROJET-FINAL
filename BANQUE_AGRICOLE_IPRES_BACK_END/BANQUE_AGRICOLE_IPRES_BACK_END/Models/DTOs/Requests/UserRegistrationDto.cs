using System.ComponentModel.DataAnnotations;
using BANQUE_AGRICOLE_IPRES_BACK_END.Models.DTOs.Requests;
using IpresDB.Data;
using Microsoft.AspNetCore.Identity;

namespace Models.DTOs.Requests
{
    public class UserRegistrationDto
    {
        [Required]
        public string Username { get; set; } = null!;
        [Required]
        public string Prenom { get; set; } = null!;
        [Required]
        [Phone]
        public string Telephone { get; set; } = null!;
        [Required]
        public string Nom { get; set; } = null!;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;


    }
}