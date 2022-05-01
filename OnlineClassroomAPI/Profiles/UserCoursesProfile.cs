using AutoMapper;
using OnlineClassroomAPI.DTOs;
using OnlineClassroomAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Profiles
{
    public class UserCoursesProfile : Profile
    {
        public UserCoursesProfile()
        {
            // Source --> Target
            CreateMap<UserCourses, AddUserCoursesDTO>();
            CreateMap<AddUserCoursesDTO, UserCourses>();
            CreateMap<UserCourses, UserCoursesDTO>().
                ForMember(dest => dest.courseName, opt => opt.MapFrom(src => src.Courses.Title)).
                ForMember(dest => dest.level, opt => opt.MapFrom(src => src.Courses.Level));
        }
    }
}
