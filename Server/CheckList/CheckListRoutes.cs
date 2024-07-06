using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
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
            var userClaim = identity.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier));
            var userHash = userClaim.Value;
    
            var aggregate = await checkListBuilder.LoadForUser(userHash);
            return await aggregate.CurrentPage();
        });
        
        webApp.MapGet("/checklist/{id}", async (HttpContext context, [FromServices]TodoContext checkListContext, [FromQuery]int id) =>
        {
            var identity = (ClaimsIdentity)context.User.Identity;
            var userClaim = identity.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier));
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

        webApp.MapPost("/checklist", async (HttpContext context, [FromServices]TodoContext dbContext, [FromBody]CheckList checkList) => {
            var identity = (ClaimsIdentity)context.User.Identity;
            var userClaim = identity.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier));
            var userHash = userClaim.Value;
            
            checkList.UserHash = userHash;
            var trackedCheckList = dbContext.CheckLists.Add(checkList);
            await dbContext.SaveChangesAsync();
            foreach(var item in checkList.Items!)
            {
                item.CheckList = trackedCheckList.Entity;
                dbContext.TodoItems.Add(item);
            }
            await dbContext.SaveChangesAsync();
            return checkList;
        });
    }
}