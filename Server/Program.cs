using Microsoft.AspNetCore.OpenApi;
using OrganizeApi.Extensions;
using OrganizeApi.Todo;

var builder = WebApplication.CreateBuilder(args);
builder.Services.RegisterServices(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy("all",
        policy =>
        {
            policy.WithOrigins("*")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "ArrangelyApi", Version = "v1" });
}); 

var app = builder.Build();
app.UseCors("all");
app.UseSwagger();
app.UseSwaggerUI();
app.AddTodoRoutes();
app.Run();
