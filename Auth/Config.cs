using Duende.IdentityServer.Models;

namespace IdentityServerAspNetIdentity;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("arrangely")
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            // m2m client credentials flow client
            new Client
            {
                ClientId = "m2m.client",
                ClientName = "Client Credentials Client",

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

                AllowedScopes = { "arrangely" }
            },
            // interactive client using code flow + pkce
            new Client
            {
                ClientId = "arrangely",
                RequireClientSecret = false,

                AllowedGrantTypes = GrantTypes.Code,

                RedirectUris = { "https://arrangely.net/callback"},
                FrontChannelLogoutUri = "https://auth.arrangely.net/logout",
                PostLogoutRedirectUris = { "https://auth.arrangely.net/logout" },
                AllowedCorsOrigins =     { "https://arrangely.net" },

                AllowOfflineAccess = true,
                AllowedScopes = { "openid", "profile", "arrangely" }
            },
        };
}
