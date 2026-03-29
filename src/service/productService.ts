import { authService } from "./authService";
import { PaginatedResponse, ProductItem } from "./api.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

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
  getAll: async (page = 1, limit = 10, search = ""): Promise<PaginatedResponse<ProductItem>> => {
    const token = authService.getToken();
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${BASE_URL}/products?${queryParams}`, {
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
