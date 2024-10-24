
using backend.Context;
using backend.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddIdentityApiEndpoints<AppUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            // For testing only Testing --  Configuring Identity options (password, email uniqueness, etc.)
            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.User.RequireUniqueEmail = true;
            });

            // Configuring Entity Framework to use SQL Server
            builder.Services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlServer(builder.Configuration.GetConnectionString("SQLAuthConnection"))
            );

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapGroup("/api")
                .MapIdentityApi<AppUser>();

            // API route for user registration
            app.MapPost("/api/signup", async (
                UserManager<AppUser> userManager,
                [FromBody] UserRegistrationModel userRegistrationModel
                ) =>
            {
                AppUser user = new AppUser()
                {
                    UserName = userRegistrationModel.Username,
                    Email = userRegistrationModel.Email,
                    FullName = userRegistrationModel.FullName,
                    Gender = userRegistrationModel.Gender,
                    DateOfBirth = userRegistrationModel.DateOfBirth,
                };
                // Password confirmation check
                if (userRegistrationModel.Password != userRegistrationModel.Password2)
                {
                    return Results.BadRequest(new { message = "Password do not match." });
                }
                var result = await userManager.CreateAsync(user, userRegistrationModel.Password);
                if (result.Succeeded)
                    return Results.Ok(result);
                else
                    return Results.BadRequest(result);
            });

            app.MapControllers();

            app.Run();
        }

        // Model for User Registration
        public class UserRegistrationModel
        {
            public string Email { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
            public string Password2 { get; set; }
            public string FullName { get; set; }
            public string Gender { get; set; }
            public DateOnly DateOfBirth { get; set; }
        }
    }
}
