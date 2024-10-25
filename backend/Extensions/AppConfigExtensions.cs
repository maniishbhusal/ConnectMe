using backend.Models.DTO;

namespace backend.Extensions
{
    public static class AppConfigExtensions
    {
        public static IServiceCollection AddAppConfig(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<AppSettings>(config.GetSection("AppSettings"));
            return services;
        }
    }
}
