using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OrganizeApi.Data;
using OrganizeApi.Todo;

namespace OrganizeApi.CheckLists;

public interface ICheckListAggregate
{
    public string UserHash { get; }
    
    public int PageNumber { get;  }
    
    public Task<IEnumerable<CheckList>> CurrentPage();
    
    public Task<IEnumerable<CheckList>> JumpToPage(int pageNumber);
    
    public Task<CheckList> AddCheckList(CheckList checkList);
    
}

internal class CheckListAggregate : ICheckListAggregate
{
    private readonly TodoContext _context;
    
    private readonly string _userHash;

    private int _pageNumber;
    
    private readonly int _pageSize;

    private IEnumerable<CheckList> _currentPage = Enumerable.Empty<CheckList>();
    
    internal CheckListAggregate(TodoContext context, string userHash, int pageNumber = 0, int pageSize = 10)
    {
        _context = context;
        _userHash = userHash;
        _pageNumber = pageNumber; 
        _pageSize = pageSize;
    }
    
    internal CheckListAggregate(TodoContext context, string userHash, IEnumerable<TodoItem> items, int pageNumber = 0, int pageSize = 10)
    {
        _context = context;
        _userHash = userHash;
        _pageNumber = pageNumber; 
        _pageSize = pageSize;
    }
    
    public string UserHash => _userHash;
    
    public int PageNumber => _pageNumber;

    public async Task<IEnumerable<CheckList>> CurrentPage(){
        
        if(_currentPage.IsNullOrEmpty())
        {
            _currentPage = await LoadForPageNumber(_pageNumber);
        }
        return _currentPage;
    }

    public async Task<IEnumerable<CheckList>> JumpToPage(int pageNumber)
    {
        _pageNumber = pageNumber;
        _currentPage = await LoadForPageNumber(_pageNumber);
        return _currentPage;
    }

    public async Task<CheckList> AddCheckList(CheckList checkList)
    {
        checkList.UserHash = _userHash;
        _context.CheckLists.Add(checkList);
        await _context.SaveChangesAsync();
        return checkList;
    }
    
    private async Task<IEnumerable<CheckList>> LoadForPageNumber(int pageNumber)
    {
        var items = await _context
            .CheckLists
            .Include(x => x.Items)
            .Where(x => x.UserHash == _userHash)
            .Skip(_pageNumber * _pageSize)
            .Take(_pageSize)
            .ToListAsync();
        return items;
    }
}

public  class CheckListBuilder
{
    private readonly TodoContext _context;

    public CheckListBuilder(TodoContext context)
    {
        _context = context;
    }
    
    public async Task<ICheckListAggregate> LoadForUser(string userHash, int pageNumber = 0, int pageSize = 10)
    {
        var aggregate =  new CheckListAggregate(_context, userHash, pageNumber, pageSize);
        await aggregate.CurrentPage();
        return aggregate;
    }
    
}