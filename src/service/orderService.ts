import { authService } from "./authService";

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
};
