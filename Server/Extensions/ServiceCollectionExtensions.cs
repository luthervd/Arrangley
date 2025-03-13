using Microsoft.EntityFrameworkCore;
using OrganizeApi.Todo;
using OrganizeApi.JsonPatch;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using OrganizeApi.CheckLists;
using OrganizeApi.Data;
using Microsoft.AspNetCore.Http.Json;
using System.Text.Json.Serialization;

namespace OrganizeApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static void RegisterServices(this IServiceCollection services, IConfiguration config)
    {
        var authAuthority = config["AuthAuthority"];
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opts => {
            opts.IncludeErrorDetails = true;
        });

        services.AddAuthorization(options =>
            options.AddPolicy("user", policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireClaim("permissions", "read:tasks");
            })
        );
        
        services.AddDbContext<TodoContext>(options =>
        {
            options.UseNpgsql(config.GetConnectionString("TodoContext"));
        });
        services.AddSingleton<IJsonPatchHandler>(new JsonPatchHandler());
        services.AddSingleton<HttpClient>(new HttpClient());
        services.AddScoped<CheckListBuilder>();
        services.Configure<JsonOptions>(x =>{
             var converter = new JsonStringEnumConverter();
             x.SerializerOptions.Converters.Add(converter);
             x.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });
        var authHost = config["Authentication:Schemes:Bearer:AuthAuthority"];
        Console.WriteLine($"{authHost}");
    }
}