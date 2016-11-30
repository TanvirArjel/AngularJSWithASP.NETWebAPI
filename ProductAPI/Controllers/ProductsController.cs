using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProductAPI.Models;
using ProductAPI.Repository;

namespace ProductAPI.Controllers
{
    [Authorize]
    public class ProductsController : ApiController
    {
        private IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        // GET: api/Products
        [HttpGet]
        public IQueryable<Product> GetProducts()
        {
            return _productRepository.GetAll();
        }

        // GET: api/Products/5
        [ResponseType(typeof(Product))]
     
        public IHttpActionResult GetProduct(int id)
        {
            Product product = _productRepository.GetById(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _productRepository.Add(product);
            return CreatedAtRoute("DefaultApi", new { id = product.Id }, product);
        }

        //PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.Id)
            {
                return BadRequest();
            }
            _productRepository.Update(product);

            return StatusCode(HttpStatusCode.NoContent);
        }


        //// DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            _productRepository.Delete(id);
            return Ok();
        }

    }
}