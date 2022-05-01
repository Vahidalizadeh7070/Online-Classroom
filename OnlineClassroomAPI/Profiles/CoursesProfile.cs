using AutoMapper;
using OnlineClassroomAPI.DTOs;
using OnlineClassroomAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Profiles
{
    public class CommandsProfile : Profile
    {
        public CommandsProfile()
        {
            // Source --> Target
            CreateMap<Courses, CoursesListDTO>().ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher.FullName));
            CreateMap<Courses, CourseDetailsDTO>().ForMember(dest => dest.Teacher, opt => opt.MapFrom(src => src.Teacher.FullName));
        }
    }
}
