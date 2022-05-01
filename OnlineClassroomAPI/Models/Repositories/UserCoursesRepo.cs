using Microsoft.EntityFrameworkCore;
using OnlineClassroomAPI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models.Repositories
{
    public class UserCoursesRepo : IUserCourses
    {
        private readonly AppDbContext _dbContext;

        public UserCoursesRepo(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<UserCourses> Add(UserCourses userCourses)
        {
            if(userCourses != null)
            {
                await _dbContext.UserCourses.AddAsync(userCourses);
                await _dbContext.SaveChangesAsync();
            }
            return userCourses;
        }

        public UserCourses Exist(string userProfileId, string courseId)
        {
            return _dbContext.UserCourses.Include(userCourse => userCourse.Courses).Include(userCourse => userCourse.UserProfile).SingleOrDefault(userCourse => userCourse.CourseId == courseId && userCourse.UserProfileId == userProfileId);
        }

        public IEnumerable<UserCourses> List(string userProfileId)
        {
            return _dbContext.UserCourses.Include(userCourse => userCourse.Courses).OrderByDescending(userCourse=>userCourse.RegisterDate).Where(userCourse=>userCourse.UserProfileId==userProfileId).ToList();
        }
    }
}
