namespace OrganizeApi.JsonPatch;

public class JsonPatch<T> where T: class
{
    public string Op { get; set; } = null!;
    
    public string Path { get; set; } = null!;
    
    public string[] GetPropertyNames()
    {
        var items = Path.Split('/');
        for (var i = 0; i < items.Length; i++)
        {
            var item = items[i];
            var first = item[0].ToString().ToUpper();
            var rest = item.Substring(1);
            items[i] = first + rest;
        }

        return items;
    }
    
    public string? Value { get; set; }
}