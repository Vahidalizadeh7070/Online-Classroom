using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models
{
    public class Courses
    {
        [Key]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Level { get; set; }
        public string About { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string TeacherId { get; set; }
        public Teacher Teacher { get; set; }
        public int Capacity { get; set; }
        public ICollection<UserCourses> UserCourses { get; set; } = new List<UserCourses>();
    }
}
