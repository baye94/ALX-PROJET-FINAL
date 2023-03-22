using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace BANQUE_AGRICOLE_IPRES_BACK_END.Models.DTOs.Requests
{
    public class User
    {
        [Required]
        public string Username { get; set; } = null!;
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
        public string IdGuichet { get; set; } = null!;
    }
}

