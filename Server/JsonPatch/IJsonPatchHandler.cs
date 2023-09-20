using System.Reflection;

namespace OrganizeApi.JsonPatch;

public interface IJsonPatchHandler
{
    T ApplyPatch<T>(T original, JsonPatch<T> patch) where T : class;
}

public class  JsonPatchHandler : IJsonPatchHandler
{
    public T ApplyPatch<T>(T original, JsonPatch<T> patch) where T : class
    {
        
        var patched = original;
        var type = patched.GetType();
        var properties = patch.GetPropertyNames();
        if (properties.Length > 1)
        {
            throw new NotImplementedException("Nested properties are not supported yet.");
        }
        PropertyInfo? property = null;
        foreach (var propertyName in properties)
        {
            property = type.GetProperty(propertyName);
            if (property == null)
            {
                throw new ArgumentException($"Property {patch.Path} not found.");
            }
        }
        var value = Convert.ChangeType(patch.Value, property.PropertyType);
        property.SetValue(patched, value);
        return patched;
    }
}

