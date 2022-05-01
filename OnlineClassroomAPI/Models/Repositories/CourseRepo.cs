using Microsoft.EntityFrameworkCore;
using OnlineClassroomAPI.Models;
using OnlineClassroomAPI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models.Repositories
{
    public class CourseRepo : ICourse
    {
        private readonly AppDbContext _appDbContext;

        public CourseRepo(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public Courses Details(string id)
        {
            return _appDbContext.Courses.Include(course => course.Teacher).SingleOrDefault(course => course.Id==id);
        }


        public IEnumerable<Courses> List()
        {
            var model= _appDbContext.Courses.Include(course => course.Teacher).ToList();
            return model;
        }
    }
}
