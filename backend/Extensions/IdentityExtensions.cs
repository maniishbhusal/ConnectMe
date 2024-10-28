using backend.Context;
using backend.Models.Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace backend.Extensions
{
    public static class IdentityExtensions
    {
        public static IServiceCollection AddIdentityHandlersAndStores(this IServiceCollection services)
        {
            services.AddIdentityApiEndpoints<AppUser>()
               .AddEntityFrameworkStores<ApplicationDbContext>();
            return services;
        }

        public static IServiceCollection ConfigureIdentityOptions(this IServiceCollection services)
        {
            // For testing only Testing --  Configuring Identity options (password, email uniqueness, etc.)
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.User.RequireUniqueEmail = true;
            });
            return services;
        }

        public static IServiceCollection AddIdentityAuth(this IServiceCollection services, IConfiguration config)
        {
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(y =>
            {
                y.SaveToken = false;
                y.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(config["AppSettings:JWTSecret"]!)
                    ),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            return services;
        }

        public static IServiceCollection AddCorsOrigin(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("MyAllowSpecificOrigins",
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:5173")
                                      .AllowAnyMethod() // Allows all HTTP methods
                                      .AllowAnyHeader(); // Allows all headers;
                                  });
            });

            return services;
        }

        public static WebApplication AddIdentityAuthAndCorsMiddleware(this WebApplication app)
        {
            app.UseHttpsRedirection();
            app.UseCors("MyAllowSpecificOrigins");
            app.UseAuthentication();
            app.UseAuthorization();
            return app;
        }
    }
}
