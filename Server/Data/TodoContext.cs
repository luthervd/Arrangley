using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using OrganizeApi.CheckLists;
using OrganizeApi.Todo;

namespace OrganizeApi.Data;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {
    }
    
    public DbSet<TodoItem> TodoItems { get; set; }
    
    public DbSet<CheckList> CheckLists { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TodoItem>()
        .ToTable("TodoItem")
        .HasKey(x => x.Id);

         modelBuilder.Entity<TodoItem>()
        .Property(x => x.Label)
        .HasDefaultValue("Personal");
         
        modelBuilder.Entity<CheckList>()
        .ToTable("Checklist")
        .HasKey(cl => cl.Id);

        modelBuilder
        .Entity<CheckList>()
        .Property(x => x.Items)
        .HasColumnType("jsonb");

        var jsonOptions = new JsonSerializerOptions();
        modelBuilder
        .Entity<CheckList>()
        .Property(x => x.Items)
        .HasConversion<string>(v => JsonSerializer.Serialize(v, jsonOptions), 
                               v => JsonSerializer.Deserialize<List<CheckListItem>>(v, jsonOptions));
    }
}