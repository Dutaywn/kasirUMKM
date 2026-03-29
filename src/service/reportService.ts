import { authService } from "./authService";
import { PaginatedResponse, ReportItem } from "./api.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

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

  getAll: async (page = 1, limit = 10, search = ""): Promise<PaginatedResponse<ReportItem>> => {
    const token = authService.getToken();
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${BASE_URL}/reports?${queryParams}`, {
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
