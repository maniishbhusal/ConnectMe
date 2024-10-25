using backend.Context;
using Microsoft.EntityFrameworkCore;

namespace backend.Extensions
{
    public static class EFCoreExtensions
    {
        public static IServiceCollection InjectDBContext(this IServiceCollection services, IConfiguration config)
        {
            // Configuring Entity Framework to use SQL Server
            services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlServer(config.GetConnectionString("SQLAuthConnection"))
            );
            return services;
        }
    }
}
