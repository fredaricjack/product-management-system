import { useState } from "react";

const API = "https://product-api-pdju.onrender.com/api/products";

function EditProduct({ product, refresh, close }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const updateProduct = () => {
    fetch(`${API}/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: product.id,
        name,
        price: parseFloat(price)
      })
    }).then(() => {
      refresh();
      close();
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Edit Product</h3>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />

      <button onClick={updateProduct}>Update</button>
      <button onClick={close}>Cancel</button>
    </div>
  );
}

export default EditProduct;