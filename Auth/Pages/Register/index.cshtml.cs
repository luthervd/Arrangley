using Duende.IdentityServer.Events;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using Duende.IdentityServer.Stores;
using IdentityServerAspNetIdentity.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityServerAspNetIdentity.Pages.Register;

[SecurityHeaders]
[AllowAnonymous]
public class Index : PageModel
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IIdentityServerInteractionService _interaction;
    private readonly IEventService _events;
    private readonly IAuthenticationSchemeProvider _schemeProvider;
    private readonly IIdentityProviderStore _identityProviderStore;
        
    public Index(
        IIdentityServerInteractionService interaction,
        IAuthenticationSchemeProvider schemeProvider,
        IIdentityProviderStore identityProviderStore,
        IEventService events,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _interaction = interaction;
        _schemeProvider = schemeProvider;
        _identityProviderStore = identityProviderStore;
        _events = events;
    }
        
    public async Task<IActionResult> OnGet()
    {
        var callBack = Request.Query["callback"];
        if(string.IsNullOrEmpty(callBack))
        {
            callBack = "local";
        }
        var options = new CookieOptions();
        options.Expires = DateTime.Now.AddMinutes(10);
        options.HttpOnly = true;
        Response.Cookies.Append("callback",callBack,options);
        return Page();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        var userName = Request.Form["user"];
        var password = Request.Form["pword"];
        var user = new ApplicationUser
        {
            UserName = userName,
            Email = "test@test.com",
            EmailConfirmed = true
        }
        var saved = await _userManager.CreateAsync(user,password);
        var callback = Request.Cookies["callback"];
        if(callback == "local")
        {
            return RedirectToPage("registered");
        }
        else
        {
            return Redirect(callback);
        }
    }
        
}