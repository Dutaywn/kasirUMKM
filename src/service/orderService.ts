import { authService } from "./authService";
import { Order, PaginatedResponse } from "./api.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface CreateOrderDTO {
  userId: string;
  paymentMethod: "QRIS" | "CASH" | "TRANSFER";
  paymentStatus?: "PENDING" | "PAID";
  items: { productId: string; quantity: number; stockId: number }[];
}

export const orderService = {
  async createOrder(orderData: CreateOrderDTO) {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal membuat pesanan");
    }

    return response.json();
  },

  getAll: async (page = 1, limit = 10, search = ""): Promise<PaginatedResponse<Order>> => {
    const token = authService.getToken();
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${BASE_URL}/orders?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mendapatkan pesanan");
    }

    return response.json();
  },

  getById : async (id: string) => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mendapatkan pesanan");
    }

    return response.json();
  },
};
