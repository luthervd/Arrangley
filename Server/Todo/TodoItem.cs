using System.Text.Json.Serialization;
using OrganizeApi.CheckLists;
namespace OrganizeApi.Todo;

public class TodoItem
{
    private DateTime _created;
    
    private DateTime _due;
    
    public int Id { get; set; }
    
    public string Name { get; set; } = string.Empty;
    
    public string Description { get; set; }  = string.Empty;

    public string UserHash { get; set; }  = string.Empty;

    public string Label {get; set; } = "Personal";
    
    public bool IsComplete { get; set; }

    public ItemStatus Status { get; set;}
    

    public DateTime Created
    {
        get => _created.ToLocalTime();
        set => _created = value.ToUniversalTime();
    }

    public DateTime Due
    {
        get => _created.ToLocalTime();
        set => _created = value.ToUniversalTime();
    }
}