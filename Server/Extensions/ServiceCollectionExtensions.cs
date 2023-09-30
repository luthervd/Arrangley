using Microsoft.EntityFrameworkCore;
using OrganizeApi.Todo;
using OrganizeApi.JsonPatch;
using Microsoft.IdentityModel.Tokens;

namespace OrganizeApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static void RegisterServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<TodoContext>(options =>
        {
            options.UseNpgsql(config.GetConnectionString("TodoContext"));
        });
        services.AddAuthentication("Bearer")
        .AddJwtBearer("Bearer", options =>
        {
            options.Authority = "https://localhost:5002";
            options.Audience = "arrangely";
        });
        services.AddSingleton<IJsonPatchHandler>(new JsonPatchHandler());
    }
}