import { authService } from "./authService";
import { Expenditure, PaginatedResponse } from "./api.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface CreateExpenditureDTO {
  name: string;
  price: number;
  note?: string;
  userId: number;
}

export interface UpdateExpenditureDTO {
  name?: string;
  price?: number;
  note?: string;
}

export const expService = {
  getAll: async (page = 1, limit = 10, search = ""): Promise<PaginatedResponse<Expenditure>> => {
    const token = authService.getToken();
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${BASE_URL}/expenditures?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal mengambil data pengeluaran");
    }

    return response.json();
  },

  getById: async (id: string): Promise<Expenditure> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/expenditures/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal mengambil data pengeluaran");
    }

    return response.json();
  },

  create: async (data: CreateExpenditureDTO): Promise<Expenditure> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/expenditures`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal membuat pengeluaran");
    }

    return response.json();
  },

  update: async (id: string, data: UpdateExpenditureDTO): Promise<Expenditure> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/expenditures/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal update pengeluaran");
    }

    return response.json();
  },

  delete: async (id: string): Promise<any> => {
    const token = authService.getToken();
    const response = await fetch(`${BASE_URL}/expenditures/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Gagal menghapus pengeluaran");
    }

    return response.json();
  },
};
