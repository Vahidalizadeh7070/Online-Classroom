using OnlineClassroomAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.DTOs
{
    public class UserProfileDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string About { get; set; }
        public string FacebookAccount { get; set; }
        public string TwitterAccount { get; set; }
        
    }
}
