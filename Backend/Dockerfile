FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy only csproj first
COPY ProductApi.csproj ./
RUN dotnet restore ProductApi.csproj

# Copy rest of files
COPY . ./

# Publish ONLY this project (important)
RUN dotnet publish ProductApi.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 10000
ENV ASPNETCORE_URLS=http://0.0.0.0:10000

ENTRYPOINT ["dotnet", "ProductApi.dll"]