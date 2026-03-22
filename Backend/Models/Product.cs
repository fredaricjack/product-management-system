namespace product_management_system.Models
{
    public class Product
    {
        public int Id { get; set; }

        // Fix warning also 👇
        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }
    }
}