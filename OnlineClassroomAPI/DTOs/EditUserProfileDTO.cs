using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.DTOs
{
    public class EditUserProfileDTO
    {
        public string Id { get; set; }
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        [MaxLength(1000, ErrorMessage = "Maximum lenght is 1000 characters")]
        public string About { get; set; }
        public string FacebookAccount { get; set; }
        public string TwitterAccount { get; set; }
    }
}
