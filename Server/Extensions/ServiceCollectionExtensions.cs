using Microsoft.EntityFrameworkCore;
using OrganizeApi.Todo;
using OrganizeApi.JsonPatch;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace OrganizeApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static void RegisterServices(this IServiceCollection services, IConfiguration config)
    {
        var authAuthority = config["AuthAuthority"];
        services.AddAuthentication(opts =>{
             opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.Authority = authAuthority ?? "https://auth.arrangely.net";
            options.IncludeErrorDetails = true;
            options.TokenValidationParameters.ValidateAudience = false;
            
        });

        services.AddAuthorization(options =>
        options.AddPolicy("user", policy =>
        {
            policy.RequireAuthenticatedUser();
            policy.RequireClaim("scope", "arrangely");
        })
);
        services.AddDbContext<TodoContext>(options =>
        {
            options.UseNpgsql(config.GetConnectionString("TodoContext"));
        });
        services.AddSingleton<IJsonPatchHandler>(new JsonPatchHandler());
        services.AddSingleton<HttpClient>(new HttpClient());
    }
}