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
    public class CoursesController : ControllerBase
    {
        private readonly ICourse _course;
        private readonly IMapper _mapper;

        public CoursesController(ICourse course, IMapper mapper)
        {
            _course = course;
            _mapper = mapper;
        }

        // This action return list of all courses
        [HttpGet]
        public ActionResult<IEnumerable<CoursesListDTO>> GetCourses()
        {
            Console.WriteLine("Running List API ...");
            var courses = _course.List();
            if(!courses.Any())
            {
                return StatusCode(StatusCodes.Status204NoContent);
            }
            var mapCourse = _mapper.Map<IEnumerable<CoursesListDTO>>(courses);
            return Ok(mapCourse);
        }

        // This action return a course
        [HttpGet("{id}", Name = "GetCourse")]
        public ActionResult<CourseDetailsDTO> GetCourse(string id)
        {
            Console.WriteLine("Running API ...");
            var course = _course.Details(id);
            if (course==null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            var mapCourse = _mapper.Map<CourseDetailsDTO>(course);
            return Ok(mapCourse);
        }


    }
}
