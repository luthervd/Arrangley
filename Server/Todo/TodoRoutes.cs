using System.Diagnostics.SymbolStore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using OrganizeApi.JsonPatch;

namespace OrganizeApi.Todo;

public static class TodoRoutes
{
    public static void AddTodoRoutes(this WebApplication app)
    {
        app.MapGet("/todo", async (TodoContext context) => await context.TodoItems.ToListAsync())
            .WithName("GetTodoItems")
            .WithOpenApi();
        
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
        .WithOpenApi();

    }
    
    
}