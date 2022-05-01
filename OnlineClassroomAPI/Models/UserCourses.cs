using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models
{
    public class UserCourses
    {
        public string UserProfileId { get; set; }
        public string CourseId { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool IsReady { get; set; }
        public int Result { get; set; }

        public virtual Courses Courses { get; set; }
        public virtual UserProfile UserProfile { get; set; }

    }
}
