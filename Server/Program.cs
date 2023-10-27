using OrganizeApi.Extensions;
using OrganizeApi.Todo;
using IdentityModel.Client;
using System.Security.Claims;
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

app.UseAuthentication();
app.UseAuthorization();
app.Use(async (context,next) => {
    
    if(context != null && context.User.Identity != null && context.User.Identity.IsAuthenticated){
        var client = context.RequestServices.GetRequiredService<HttpClient>();
        var token = context.Request.Headers.Authorization[0];
        if(token != null){
            token = token.Replace("Bearer ","");
            var authAuthority = context.RequestServices.GetRequiredService<IConfiguration>()["AuthAuthority"];
            var disco = await client.GetDiscoveryDocumentAsync(authAuthority ?? "https://auth.arrangely.net");
            var response = await client.GetUserInfoAsync(new UserInfoRequest
            {
                Address = disco.UserInfoEndpoint,
                Token = token
            });
            var identity = (ClaimsIdentity)context.User.Identity;
            response.Claims.ToList().ForEach(claim => identity.AddClaim(claim));
        }
       
        await next.Invoke(context);
    }
   
});
app.AddTodoRoutes();
app.Run();
