start powershell -WorkingDirectory $PSScriptRoot { dotnet run --project ./Auth/AuthServer.csproj; -c Debug}
start powershell -WorkingDirectory $PSScriptRoot { dotnet run --project ./Server/OrganizeApi.csproj; -c Debug}
start powershell -WorkingDirectory $PSScriptRoot { cd UI; yarn run dev;}