using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models.Interfaces
{
    public interface IUserCourses
    {
        Task<UserCourses> Add(UserCourses userCourses);
        IEnumerable<UserCourses> List(string userProfileId);

        UserCourses Exist(string userProfileId, string courseId);
    }
}
