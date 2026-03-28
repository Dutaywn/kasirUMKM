import { authService } from "./authService";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface ProductItem {
  id: number;
  name: string | null;
  imgUrl: string | null;
  price: number | null;
  categoryId: number;
  stocks: number;
  stockType: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  imgUrl?: string;
  price: number;
  categoryId: number;
  stocks: number;
  stockType: string;
}

export interface UpdateProductPayload {
  name?: string;
  imgUrl?: string;
  price?: number;
  categoryId?: number;
  stocks?: number;
  stockType?: string;
}

export const productService = {
  getAll: async (): Promise<ProductItem[]> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal mengambil data produk");
    }

    return response.json();
  },

  getById: async (id: string): Promise<ProductItem> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal mengambil detail produk");
    }

    return response.json();
  },

  create: async (data: CreateProductPayload): Promise<any> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal membuat produk");
    }

    return response.json();
  },

  update: async (id: string, data: UpdateProductPayload): Promise<any> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal mengupdate produk");
    }

    return response.json();
  },

  delete: async (id: string): Promise<any> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal menghapus produk");
    }

    return response.json();
  },
};
