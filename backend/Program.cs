
using backend.Controllers;
using backend.Extensions;
using backend.Models.Domain;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            // Register services using custom extension methods
            builder.Services.AddSwaggerExplorer()
                            .AddCorsOrigin()
                            .InjectDBContext(builder.Configuration)
                            .AddAppConfig(builder.Configuration)
                            .AddIdentityHandlersAndStores()
                            .ConfigureIdentityOptions()
                            .AddIdentityAuth(builder.Configuration);


            var app = builder.Build();

            app.ConfigureSwaggerExplorer()
                .AddIdentityAuthAndCorsMiddleware();

            app.MapControllers();

            app.MapGroup("/api")
                .MapIdentityApi<AppUser>();

            app.MapGroup("/api").MapIdentityUserEndpoints();

            app.Run();
        }

       
    }
}
