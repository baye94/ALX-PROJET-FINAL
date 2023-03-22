using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.AspNetCore.Mvc;
using Google.Protobuf.WellKnownTypes;

namespace Models
{
    public class Journalisation
    {
        public Journalisation()
        {
        }
        public string Id { get; set; } = null!;
        public string IdUsers { get; set; } = null!;
        public string Action { get; set; } = null!;
        public string Ip { get; set; } = null!;
        public string Mac { get; set; } = null!;
        public string TimeStamp {get; set;} = null!;

       
        
    }
     
 
   
}

