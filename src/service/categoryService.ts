import { authService } from "./authService";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const categoryService = {
    getAll: async () => {
        const token = authService.getToken();
        const response = await fetch(`${BASE_URL}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return response.json();
    },
    getById: async (id: string) => {
        const token = authService.getToken();
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch category");
        }
        return response.json();
    },
    create: async (data: any) => {
        const token = authService.getToken();
        const response = await fetch(`${BASE_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Failed to create category");
        }
        return response.json();
    },
    update: async (id: string, data: any) => {
        const token = authService.getToken();
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Failed to update category");
        }
        return response.json();
    },
    delete: async (id: string) => {
        const token = authService.getToken();
        const response = await fetch(`${BASE_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete category");
        }
        return response.json();
    },
}