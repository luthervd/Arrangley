using OrganizeApi.Todo;

namespace OrganizeApi.CheckLists;

public class CheckList
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    
    public string UserHash { get; set; }  = string.Empty;
    
    
    public virtual ICollection<TodoItem>? Items { get; set; }
    
}
