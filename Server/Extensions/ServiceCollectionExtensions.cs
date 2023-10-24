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
            options.Events = new JwtBearerEvents()
            {
                OnMessageReceived = msg =>
                {
                    var token = msg?.Request.Headers.Authorization.ToString();
                    string path = msg?.Request.Path ?? "";
                    if (!string.IsNullOrEmpty(token))

                    {
                        Console.WriteLine("Access token");
                        Console.WriteLine($"URL: {path}");
                        Console.WriteLine($"Token: {token}\r\n");
                    }
                    else
                    {
                        Console.WriteLine("Access token");
                        Console.WriteLine("URL: " + path);
                        Console.WriteLine("Token: No access token provided\r\n");
                    }
                    return Task.CompletedTask;
                },
                 OnTokenValidated = ctx =>
                {
                    Console.WriteLine();
                    Console.WriteLine("Claims from the access token");
                    if (ctx?.Principal != null)
                    {
                        foreach (var claim in ctx.Principal.Claims)
                        {
                            Console.WriteLine($"{claim.Type} - {claim.Value}");
                        }
                    }
                    Console.WriteLine();
                    return Task.CompletedTask;
                }
            };
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
    }
}