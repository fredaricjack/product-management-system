import { useEffect, useState } from "react";
import EditProduct from "./EditProduct";

const API = "https://product-api-541d.onrender.com/api/products";

function ProductCrud() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  // GET PRODUCTS
  const fetchProducts = () => {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data); // ✅ ADD HERE
      setProducts(data);
    })
    .catch(err => console.error(err));
};

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const addProduct = async () => {
  console.log("clicked", name, price);

  if (!name || !price) return alert("Enter all fields");

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      price: parseFloat(price)
    })
  });

  setName("");
  setPrice("");

  setTimeout(() => {
    fetchProducts(); // 🔥 delay fix (Render sleep issue)
  }, 500);
};

  // DELETE
  const deleteProduct = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    }).then(fetchProducts);
  };

  return (
    <div className="container">
      <h2>Add Product</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addProduct}>Add</button>

      <hr />

      <h2>Product List</h2>

      {products.length === 0 ? (
        <p>No products</p>
      ) : (
        products.map((p) => (
          <div key={p.id} style={{ marginBottom: "10px" }}>
            {p.name} - ₹{p.price}

            <button onClick={() => setEditProduct(p)}>Edit</button>
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </div>
        ))
      )}

      {editProduct && (
        <EditProduct
          product={editProduct}
          refresh={fetchProducts}
          close={() => setEditProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductCrud;