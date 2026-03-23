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
        public async Task<IActionResult> PostProduct([FromBody] Product product)
        {
            if (product == null)
                return BadRequest();

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
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