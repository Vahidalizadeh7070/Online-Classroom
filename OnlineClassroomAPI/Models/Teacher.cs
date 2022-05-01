using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models
{
    public class Teacher
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Age { get; set; }
        public string Education { get; set; }
        public string LastUpdated { get; set; }
        public ICollection<Courses> Courses{get;set;}=new List<Courses>();
    }
}
