using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityServerAspNetIdentity.Pages.Register;

[AllowAnonymous]
public class Registered : PageModel
{
    public async Task<IActionResult> OnGet()
    {
        return Page();
    }
}