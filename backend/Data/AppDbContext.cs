using Microsoft.EntityFrameworkCore;
using RetailManagerLite.Api.Models;

namespace RetailManagerLite.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        { }

        public DbSet<Product> Products { get; set; }
    }

    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {

                context.Products.AddRange(
                    new Product { Name = "Latte", Category = "Bevande", Price = 1.5m, Quantity = 50 },
                    new Product { Name = "Pane", Category = "Alimentari", Price = 2.0m, Quantity = 30 },
                    new Product { Name = "Uova", Category = "Alimentari", Price = 3.5m, Quantity = 20 }
                );
                context.SaveChanges();
            
        }
    }

}

