namespace ProductAPI.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using ProductAPI.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<ProductDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ProductDbContext context)
        {
            context.Products.AddOrUpdate(new Product[]
            {
                new Product() {Id = 1, Name = "ASP.NET MVC",Price = 50.00M},
                 new Product() {Id = 2, Name = "Entity Framework",Price = 60.00M},
                  new Product() {Id = 3, Name = "ASP.NET Identity",Price = 70.00M}
            });
        }
    }
}
