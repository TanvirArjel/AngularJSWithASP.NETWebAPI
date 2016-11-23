using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ProductAPI.Models
{
    public class ProductDbContext : DbContext
    {
       
        public ProductDbContext() : base("name=ProductDbContext")
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
