using Microsoft.EntityFrameworkCore;
using OrganizeApi.JsonPatch;

namespace OrganizeApi.Todo;

public static class TodoRoutes
{
    public static void AddTodoRoutes(this WebApplication app)
    {
        
        app.MapGet("/todo", async (TodoContext context) => await context.TodoItems.ToListAsync())
            .WithName("GetTodoItems")
            .WithOpenApi()
            .RequireAuthorization("user");
        
        app.MapPost("/todo", async (HttpContext context, TodoContext dbContext, TodoItem todoItem) =>
        {
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