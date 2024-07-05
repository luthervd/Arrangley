using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizeApi.JsonPatch;
using OrganizeApi.Todo;
using OrganizeApi.CheckLists;
using OrganizeApi.Data;

namespace OrganizeApi.Todo;

public static class TodoRoutes
{
    public static void AddTodoRoutes(this WebApplication app)
    {
        
        app.MapGet("/todo", async (HttpContext context,TodoContext todoContext) =>
        {
            var userHash = context.User.FindFirstValue(ClaimTypes.NameIdentifier);           
            var items = await todoContext.TodoItems.Where(x => x.UserHash == userHash).ToListAsync();
            return items;
        })
        .WithName("GetTodoItems")
        .WithOpenApi()
        .RequireAuthorization("user");
        
        app.MapPost("/todo", async (HttpContext context, TodoContext dbContext, TodoItem todoItem) =>
        {
            var identity = (ClaimsIdentity)context.User.Identity;
            var userClaim = identity.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.NameIdentifier));
            todoItem.UserHash = userClaim.Value;
            dbContext.TodoItems.Add(todoItem);
            var result = await dbContext.SaveChangesAsync();
            if (result == 1)
            {
                context.Response.StatusCode = 201;
                await context.Response.WriteAsJsonAsync(todoItem);
            }
            else
            {
                context.Response.StatusCode = 400;
                
            }
        })
        .WithName("CreateTodoItem")
        .RequireAuthorization("user")
        .WithOpenApi();
        
        app.MapPut("/todo/{id}", async (HttpContext requestContext, int id, TodoItem item, TodoContext todoContext) => {
            var currentItem = await todoContext.TodoItems.FirstOrDefaultAsync(x => x.Id == id);
            if(currentItem == null){
                await todoContext.TodoItems.AddAsync(item);
            }
            else{
                currentItem.Due = item.Due;
                currentItem.Description = item.Description;
                currentItem.Label = item.Label;
                currentItem.Name = item.Name;
                
            }
            await todoContext.SaveChangesAsync();
            return Results.Ok();
        });

        app.MapPatch("/todo/{id}", async (HttpContext httpContext, IJsonPatchHandler handler, int id, JsonPatch<TodoItem> patch, TodoContext context) =>
        {
            var item = await context.TodoItems.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                httpContext.Response.StatusCode = 404;
                return;
            }
            var patched = handler.ApplyPatch(item, patch);
            context.TodoItems.Update(patched);
            var result = context.SaveChangesAsync();
            httpContext.Response.StatusCode = 200;
        })
        .WithName("PatchTodoItem")
        .WithOpenApi()
        .RequireAuthorization("user");

        app.MapDelete("/todo/{id}", async (HttpContext context, int id, TodoContext dbContext) =>
        {
            var item = await dbContext.TodoItems.FirstOrDefaultAsync(x => x.Id == id);
            if (item == null)
            {
                context.Response.StatusCode = 400;
            }
            else
            {
                dbContext.TodoItems.Remove(item);
                var removed = await dbContext.SaveChangesAsync();
                context.Response.StatusCode = removed == 1 ? 200 : 400;
            }
        })
        .WithName("DeleteTodoItem")
        .WithOpenApi()
        .RequireAuthorization("user");

    }
    
    
}