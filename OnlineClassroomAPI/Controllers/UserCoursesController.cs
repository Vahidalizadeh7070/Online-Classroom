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
    public class UserCoursesController : ControllerBase
    {
        private readonly IUserCourses _userCourses;
        private readonly IMapper _mapper;
        private readonly IUserProfile _userProfile;

        public UserCoursesController(IUserCourses userCourses, IUserProfile userProfile, IMapper mapper)
        {
            _userCourses = userCourses;
            _mapper = mapper;
            _userProfile = userProfile;
        }

        [HttpGet]
        public ActionResult<IEnumerable<UserProfileDTO>> List(string email)
        {
            var user = _userProfile.Details(email);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

            var userCourses = _userCourses.List(user.Id);
            if (userCourses.Count() == 0)
            {
                return StatusCode(StatusCodes.Status204NoContent);
            }

            var model = _mapper.Map<IEnumerable<UserCoursesDTO>>(userCourses);
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult<UserCoursesDTO>> Add(AddUserCoursesDTO addUserCoursesDTO)
        {
            var user = _userProfile.Details(addUserCoursesDTO.Email);
            addUserCoursesDTO.UserProfileId = user.Id;
            if (user.Id == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            var exist = _userCourses.Exist(addUserCoursesDTO.UserProfileId, addUserCoursesDTO.CourseId);
            if (exist != null)
            {
                return StatusCode(StatusCodes.Status405MethodNotAllowed);
            }

            var model = _mapper.Map<UserCourses>(addUserCoursesDTO);
            model.RegisterDate = DateTime.Now;
            model.IsReady = false;
            model.Result = 0;
            var addValue = await _userCourses.Add(model);
            var result = _mapper.Map<UserCoursesDTO>(addValue);
            return Ok(result);
        }

        [HttpGet("{email}&{courseId}")]
       
        public ActionResult<UserCoursesDTO> Exist(string email, string courseId)
        {
            var user = _userProfile.Details(email);
            if(user==null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            var model = _userCourses.Exist(user.Id,courseId);
            if(model==null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            var mapModel = _mapper.Map<UserCoursesDTO>(model);
            return Ok(mapModel);
        }
    }
}
