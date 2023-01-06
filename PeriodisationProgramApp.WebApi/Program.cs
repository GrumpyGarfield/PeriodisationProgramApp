using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.DataAccess;
using PeriodisationProgramApp.DataAccess.Repositories;
using PeriodisationProgramApp.DataAccess.UnitsOfWork;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.WebApi;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("Configs\\database.json");

// Add services to the container.
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
    b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)));

builder.Services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>))
                .AddTransient<IUnitOfWork, UnitOfWork>()
                .AddSingleton<IAppSettings, AppSettings>()
                .AddSingleton(x => x.GetService<IAppSettings>()!.DefaultDataSettings);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    try
    {
        var context = serviceScope.ServiceProvider.GetRequiredService<ApplicationContext>();
        var defaultDataSettings = serviceScope.ServiceProvider.GetRequiredService<IDefaultDataSettings>();
        DataInitializer.SeedData(context, defaultDataSettings).Wait();
    }
    catch(Exception ex)
    {
        //Skip loading data
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
