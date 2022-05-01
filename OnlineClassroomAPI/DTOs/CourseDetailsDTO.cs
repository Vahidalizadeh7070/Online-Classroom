using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.DTOs
{
    public class CourseDetailsDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Level { get; set; }
        public string About { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string Teacher { get; set; }
        public int Capacity { get; set; }
    }
}
