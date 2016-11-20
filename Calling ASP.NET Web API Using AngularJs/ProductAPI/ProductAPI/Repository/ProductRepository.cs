using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ProductAPI.Models;

namespace ProductAPI.Repository
{
    public class ProductRepository : IProductRepository, IDisposable
    {
        private ProductDbContext context = new ProductDbContext();
        public IQueryable<Product> GetAll()
        {
            return context.Products;
        }
        public Product GetById(int id)
        {
            return context.Products.Find(id);
        }
        public void Add(Product product)
        {
            context.Products.Add(product);
            context.SaveChanges();
        }

        public void Update(Product product)
        {
            context.Entry(product).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            Product product = context.Products.Find(id);
            context.Products.Remove(product);
            context.SaveChanges();
        }

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (context != null)
                {
                    context.Dispose();
                    context = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}