using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineClassroomAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineClassroomAPI.Models
{
    // DbContext class
    // This class inherits from IdentityDbContext 
    // IdentityDbContext provides for us all tables that we need in our project for authentication and authorization based on the 
    // Asp.net core identity 
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Teacher>().
            HasMany(p => p.Courses).WithOne(p => p.Teacher).HasForeignKey(p => p.TeacherId);

            modelBuilder.Entity<Courses>().
            HasOne(p => p.Teacher).WithMany(p => p.Courses).HasForeignKey(p => p.TeacherId);

            modelBuilder.Entity<UserCourses>().HasKey(sc => new { sc.CourseId, sc.UserProfileId});
            modelBuilder.Entity<UserCourses>()
                .HasOne<Courses>(sc => sc.Courses)
                .WithMany(s => s.UserCourses)
                .HasForeignKey(sc => sc.CourseId);

            modelBuilder.Entity<UserCourses>()
                .HasOne<UserProfile>(sc => sc.UserProfile)
                .WithMany(s => s.UserCourses)
                .HasForeignKey(sc => sc.UserProfileId);
        }
        public DbSet<Courses> Courses { get; set; }
        public DbSet<Teacher> Teacher { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        public DbSet<UserCourses> UserCourses{ get; set; }

    }
}