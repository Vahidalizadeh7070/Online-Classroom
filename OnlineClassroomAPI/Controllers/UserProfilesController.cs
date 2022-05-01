using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineClassroomAPI.DTOs;
using OnlineClassroomAPI.Models;
using OnlineClassroomAPI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfilesController : ControllerBase
    {
        private readonly IUserProfile _userProfile;
        private readonly IMapper _mapper;

        public UserProfilesController(IUserProfile userProfile,IMapper mapper)
        {
            _userProfile = userProfile;
            _mapper = mapper;
        }

        [HttpGet("{email}")]
        public ActionResult<UserProfileDTO> UserProfile(string email)
        {
            var userProfile = _userProfile.Details(email);
            if(userProfile == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            var mapProfile = _mapper.Map<UserProfileDTO>(userProfile);
            return Ok(mapProfile);
        }

        [HttpPost]
        public async Task<ActionResult<UserProfileDTO>> Create(CreateUserProfileDTO createUserProfileDTO)
        {
            var userProfile = _userProfile.Details(createUserProfileDTO.Email);
            if (userProfile != null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            var userProfileModel = _mapper.Map<UserProfile>(createUserProfileDTO);
            userProfileModel.Id = Guid.NewGuid().ToString();
            await _userProfile.Add(userProfileModel);
            var mapProfile = _mapper.Map<UserProfileDTO>(userProfileModel);
            return Ok(mapProfile);
        }

        [HttpPut]
        public async Task<ActionResult<UserProfileDTO>> Edit(EditUserProfileDTO editUserProfileDTO)
        {
            var userProfile = _userProfile.Details(editUserProfileDTO.Email);
            if (userProfile == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            var userProfileModel = _mapper.Map<UserProfile>(editUserProfileDTO);
            await _userProfile.Edit(userProfileModel);
            var mapProfile = _mapper.Map<UserProfileDTO>(userProfileModel);
            return Ok(mapProfile);
        }
    }
}
