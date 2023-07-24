#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["PeriodisationProgramApp.WebApi/PeriodisationProgramApp.WebApi.csproj", "PeriodisationProgramApp.WebApi/"]
COPY ["PeriodisationProgramApp.BusinessLogic/PeriodisationProgramApp.BusinessLogic.csproj", "PeriodisationProgramApp.BusinessLogic/"]
COPY ["PeriodisationProgramApp.DataAccess/PeriodisationProgramApp.DataAccess.csproj", "PeriodisationProgramApp.DataAccess/"]
COPY ["PeriodisationProgramApp.Configuration/PeriodisationProgramApp.Configuration.csproj", "PeriodisationProgramApp.Configuration/"]
COPY ["PeriodisationProgramApp.Domain/PeriodisationProgramApp.Domain.csproj", "PeriodisationProgramApp.Domain/"]
COPY ["PeriodisationProgramApp.Common/PeriodisationProgramApp.Common.csproj", "PeriodisationProgramApp.Common/"]
RUN dotnet restore "PeriodisationProgramApp.WebApi/PeriodisationProgramApp.WebApi.csproj"
COPY . .
WORKDIR "/src/PeriodisationProgramApp.WebApi"
RUN dotnet build "PeriodisationProgramApp.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PeriodisationProgramApp.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PeriodisationProgramApp.WebApi.dll"]