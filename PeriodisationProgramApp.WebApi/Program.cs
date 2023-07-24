using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PeriodisationProgramApp.BusinessLogic.Extensions;
using PeriodisationProgramApp.BusinessLogic.Factories;
using PeriodisationProgramApp.BusinessLogic.Factories.Interfaces;
using PeriodisationProgramApp.Configuration.Interfaces;
using PeriodisationProgramApp.DataAccess;
using PeriodisationProgramApp.DataAccess.Extensions;
using PeriodisationProgramApp.DataAccess.Repositories;
using PeriodisationProgramApp.DataAccess.UnitsOfWork;
using PeriodisationProgramApp.Domain.Interfaces;
using PeriodisationProgramApp.WebApi;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("Configs/database.json");

// Add services to the container.
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
    b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)));

builder.Services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>))
                .AddTransient<IUnitOfWork, UnitOfWork>()
                .AddScoped<ITrainingSessionFactory, TrainingSessionFactory>()
                .AddScoped<ITrainingProgramFactory, TrainingProgramFactory>()
                .AddSingleton<IAppSettings, AppSettings>()
                .AddSingleton(x => x.GetService<IAppSettings>()!.DefaultDataSettings);

builder.Services.AddRepositories();
builder.Services.AddTrainingSessionBuilders();
builder.Services.AddTrainingProgramBuilders();
builder.Services.AddBusinessLogicServices();

builder.Services.AddSingleton(FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("Configs/firebase.json"),
}));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://securetoken.google.com/periodisationprogramapp";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://securetoken.google.com/periodisationprogramapp",
            ValidateAudience = true,
            ValidAudience = "periodisationprogramapp",
            ValidateLifetime = true
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
