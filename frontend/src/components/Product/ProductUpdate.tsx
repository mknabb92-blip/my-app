import React, { useState } from "react";
import type { Product, ProductStatus } from "../../types/product";
import { productApi } from "../../api/productApi";

type Props = {
  product: Product;
  onUpdated: () => void;
  onCancel: () => void;
};

const ProductUpdate: React.FC<Props> = ({ product, onUpdated, onCancel }) => {
  const [id] = useState(product.id);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(String(product.price));
  const [sku, setSku] = useState(product.sku);
  const [stock, setStock] = useState(String(product.stock));
  const [status, setStatus] = useState<ProductStatus>(product.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !price || !sku || !stock) {
      alert("please fill required fields.");
      return;
    }

    const priceNum = Number(price);
    const stockNum = Number(stock);

    if (Number.isNaN(priceNum) || Number.isNaN(stockNum)) {
      alert("price and stock must be numbers.");
      return;
    }

    try {
      setLoading(true);
      await productApi.update(id, {
        name,
        description,
        price: priceNum,
        sku,
        stock: stockNum,
        status,
      });
      alert("product updated");
      await onUpdated();
    } catch (err: any) {
      alert(err.message || "failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>update product</h2>

      <div>
        <label>
          id
          <input value={id} readOnly style={input} />
        </label>
      </div>

      <div>
        <label>
          name
          <input value={name} onChange={(e) => setName(e.target.value)} style={input} />
        </label>
      </div>

      <div>
        <label>
          description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={input}
          />
        </label>
      </div>

      <div>
        <label>
          price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={input}
          />
        </label>
      </div>

      <div>
        <label>
          sku
          <input value={sku} onChange={(e) => setSku(e.target.value)} style={input} />
        </label>
      </div>

      <div>
        <label>
          stock
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={input}
          />
        </label>
      </div>

      <div>
        <label>
          status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProductStatus)}
            style={input}
          >
            <option value="draft">draft</option>
            <option value="active">active</option>
            <option value="blocked">blocked</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleUpdate} disabled={loading}>
          {loading ? "updating..." : "update"}
        </button>
        <button onClick={onCancel} style={{ marginLeft: 8 }}>
          previous
        </button>
      </div>
    </div>
  );
};

const input: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: 6,
  marginBottom: 8,
};

export default ProductUpdate;