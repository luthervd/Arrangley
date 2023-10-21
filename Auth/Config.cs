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

                RedirectUris = { "http://localhost:5003/callback", "http://arrangely.net/callback"},
                FrontChannelLogoutUri = "http://auth.arrangely.net/logout",
                PostLogoutRedirectUris = { "http://auth.arrangely.net/logout" },
                AllowedCorsOrigins =     { "http://127.0.0.1:5003","http://localhost:5003", "http://arrangely.net" },

                AllowOfflineAccess = true,
                AllowedScopes = { "openid", "profile", "arrangely" }
            },
        };
}
