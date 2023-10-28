start powershell -WorkingDirectory $PSScriptRoot { dotnet run --project ./Auth/AuthServer.csproj;}
start powershell -WorkingDirectory $PSScriptRoot { dotnet run --project ./Server/OrganizeApi.csproj;}
start powershell -WorkingDirectory $PSScriptRoot { cd UI; yarn run dev;}