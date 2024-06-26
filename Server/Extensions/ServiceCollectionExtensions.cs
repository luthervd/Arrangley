﻿using Microsoft.EntityFrameworkCore;
using OrganizeApi.Todo;
using OrganizeApi.JsonPatch;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using OrganizeApi.CheckLists;
using OrganizeApi.Data;

namespace OrganizeApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static void RegisterServices(this IServiceCollection services, IConfiguration config)
    {
        var authAuthority = config["AuthAuthority"];
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opts => {
            opts.IncludeErrorDetails = true;
            opts.MapInboundClaims = true;
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
        services.AddScoped<CheckListBuilder>();
        var authHost = config["Authentication:Schemes:Bearer:AuthAuthority"];
        Console.WriteLine($"{authHost}");
    }
}