import { useState } from "react";

const API = "https://product-api-541d.onrender.com/api/products";

function EditProduct({ product, refresh, close }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const updateProduct = async () => {
    if (!name || !price) {
      alert("Please enter all fields");
      return;
    }

    await fetch(`${API}/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
        name: name,
        price: parseFloat(price),
      }),
    });

    refresh();   // reload product list
    close();     // close edit form
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Edit Product</h3>

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

      <br /><br />

      <button onClick={updateProduct}>Update</button>
      <button onClick={close} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
}

export default EditProduct;