using Microsoft.AspNetCore.Mvc;

namespace product_management_system.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static List<object> products = new List<object>();

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(products);
        }

        private static int currentId = 1;

        [HttpPost]
        public IActionResult AddProduct(object product)
        {
            var newProduct = new
            {
                Id = currentId++,
                Name = product.GetType().GetProperty("name")?.GetValue(product),
                Price = product.GetType().GetProperty("price")?.GetValue(product)
            };

            products.Add(newProduct);
            return Ok(newProduct);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, object product)
        {
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            return NoContent();
        }
    }
}