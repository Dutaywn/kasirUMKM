import { authService } from "./authService";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface TopProduct {
  name: string;
  quantity: number;
  productId: number;
}

export interface ReportItem {
  id: number;
  date: string;
  periodType: string;
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  totalOrders: number;
  topProductsData: TopProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface ReportResponse {
  message?: string;
  data?: ReportItem;
  id?: string;
  reportDate?: string;
  totalIncome?: number;
  totalExpense?: number;
  netProfit?: number;
  topProducts?: any;
  createdAt?: string;
}

export const reportService = {
  generateDaily: async (): Promise<any> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/reports/generate-daily`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal membuat laporan harian");
    }

    return response.json();
  },

  getAll: async (): Promise<ReportItem[]> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/reports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal mengambil riwayat laporan");
    }

    return response.json();
  },

  deleteReport: async (id: string): Promise<any> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/reports/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal menghapus laporan");
    }

    return response.json();
  },
};
