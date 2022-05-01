using Microsoft.EntityFrameworkCore;
using OnlineClassroomAPI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models.Repositories
{
    public class UserProfileRepo : IUserProfile
    {
        private readonly AppDbContext _appDbContext;

        public UserProfileRepo(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<UserProfile> Add(UserProfile userProfile)
        {
            await _appDbContext.UserProfiles.AddAsync(userProfile);
            await _appDbContext.SaveChangesAsync();
            return userProfile;
        }

        public UserProfile Details(string email)
        {
            return _appDbContext.UserProfiles.AsNoTracking().SingleOrDefault(UserProfile=>UserProfile.Email==email);
        }

        public async Task<UserProfile> Edit(UserProfile userProfile)
        {
            if (userProfile != null)
            {
                _appDbContext.UserProfiles.Attach(userProfile);
                _appDbContext.Entry(userProfile).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _appDbContext.SaveChangesAsync();
                return userProfile;

            }
            return null;
        }
    }
}
