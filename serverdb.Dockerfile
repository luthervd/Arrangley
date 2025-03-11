FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App

# Copy everything
COPY ./ ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet tool install dotnet-ef 
RUN dotnet ef migrations --project ./Server/OrganizeApi.csproj script -o script.sql

FROM postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_PORT 5432
ENV POSTGRES_DB arrangley
COPY --from=build-env /App/script.sql /docker-entrypoint-initdb.d/script.sql
USER postgres