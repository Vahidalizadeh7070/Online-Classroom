using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models.Interfaces
{
    public interface ICourse
    {
        Courses Details(string id);
        IEnumerable<Courses> List();
    }
}
