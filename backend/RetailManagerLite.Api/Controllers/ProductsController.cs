using Microsoft.AspNetCore.Mvc;
using RetailManagerLite.Api.Models;

namespace RetailManagerLite.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static readonly List<Product> _products = new()
        {
            new Product { Id = 1, Name = "Pane", Category = "Alimentari", Price = 1.20m, Quantity = 30 },
            new Product { Id = 2, Name = "Latte", Category = "Alimentari", Price = 0.99m, Quantity = 50 },
            new Product { Id = 3, Name = "Shampoo", Category = "Cura persona", Price = 3.50m, Quantity = 20 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAll() => Ok(_products);

        [HttpGet("{id}")]
        public ActionResult<Product> GetById(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> Create(Product product)
        {
            product.Id = _products.Max(p => p.Id) + 1;
            _products.Add(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Product updated)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();

            product.Name = updated.Name;
            product.Category = updated.Category;
            product.Price = updated.Price;
            product.Quantity = updated.Quantity;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            _products.Remove(product);
            return NoContent();
        }
    }
}
