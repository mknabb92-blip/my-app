const API_BASE = "http://localhost:3000";

import type { Product, ProductStatus } from "../types/product";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : "",
  };
};

export const productApi = {
  async list(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/api/product`, {
      headers: getAuthHeaders(),
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(body.message || "failed to fetch products");
    }

    return body;
  },

  async create(data: {
    name: string;
    description?: string;
    price: number;
    sku: string;
    stock: number;
    status: ProductStatus;
  }): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/product`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(body.message || "failed to create product");
    }

    return body;
  },

  async update(
    id: number,
    data: {
      name: string;
      description?: string;
      price: number;
      sku: string;
      stock: number;
      status: ProductStatus;
    }
  ): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/product/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(body.message || "failed to update product");
    }

    return body;
  },
};