using AutoMapper;
using OnlineClassroomAPI.DTOs;
using OnlineClassroomAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Profiles
{
    public class UserProfileProfile : Profile
    {
        public UserProfileProfile()
        {
            // Source --> Target
            CreateMap<UserProfile, UserProfileDTO>();
            CreateMap<CreateUserProfileDTO, UserProfile>();
            CreateMap<EditUserProfileDTO, UserProfile>();
        }
    }
}
