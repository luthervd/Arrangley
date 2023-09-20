using Microsoft.EntityFrameworkCore;
using OrganizeApi.Todo;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using OrganizeApi.Shared;

namespace OrganizeApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static void RegisterServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<TodoContext>(options =>
        {
            options.UseNpgsql(config.GetConnectionString("TodoContext"));
        });
        services.AddSingleton<IJsonPatchHandler>(new JsonPatchHandler());
    }
}