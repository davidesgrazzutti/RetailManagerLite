using Microsoft.EntityFrameworkCore;
using RetailManagerLite.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Abilita CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurazione EF Core con SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=retail.db")
);

var app = builder.Build();

// --- Seed dei dati prima di avviare l'app ---
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Stampa percorso DB
    Console.WriteLine("DB path: " + Path.GetFullPath("retail.db"));

    // Crea tabelle se non ci sono
    context.Database.EnsureCreated();

    // Seed dati solo se il DB è vuoto
    if (!context.Products.Any())
    {
        DbSeeder.Seed(context);
    }

    // Controllo rapido
    Console.WriteLine($"Prodotti in DB: {context.Products.Count()}");
}

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();






