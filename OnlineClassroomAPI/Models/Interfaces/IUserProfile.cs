using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models.Interfaces
{
    public interface IUserProfile
    {
        Task<UserProfile> Add(UserProfile userProfile);
        Task<UserProfile> Edit(UserProfile userProfile);
        UserProfile Details(string email);

    }
}
