using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizeApi.Data;

namespace OrganizeApi.CheckLists;

public static class CheckListRoutes
{
    public static void AddCheckListRoutes(this WebApplication webApp)
    {
        webApp.MapGet("/checklist", async (HttpContext context, [FromServices]CheckListBuilder checkListBuilder) =>
        {
            var identity = (ClaimsIdentity)context.User.Identity;
            var userClaim = identity.Claims.FirstOrDefault(x => x.Type == "sub");
            var userHash = userClaim.Value;
            var aggregate = await checkListBuilder.LoadForUser(userHash);
            return await aggregate.CurrentPage();
        });
        
        webApp.MapGet("/checklist/{id}", async (HttpContext context, [FromServices]TodoContext checkListContext, [FromQuery]int id) =>
        {
            var identity = (ClaimsIdentity)context.User.Identity;
            var userClaim = identity.Claims.FirstOrDefault(x => x.Type == "sub");
            var userHash = userClaim.Value;
            var item = await checkListContext.CheckLists.FirstOrDefaultAsync(x => x.UserHash == userHash && x.Id == id);
            if (item == null)
            {
                return Results.StatusCode(204);
            }
            else
            {
                return Results.Json(item);
            }
        });
    }
}