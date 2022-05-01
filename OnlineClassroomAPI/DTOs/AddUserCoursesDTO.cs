using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.DTOs
{
    public class AddUserCoursesDTO
    {
        public string UserProfileId { get; set; }
        public string CourseId { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool IsReady { get; set; }
        public int Result { get; set; }
        public string Email { get; set; }
    }
}
