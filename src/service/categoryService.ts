export const categoryService = {
    getAll: async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return response.json();
    },
    getById: async (id: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch category");
        }
        return response.json();
    },
    create: async (data: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Failed to create category");
        }
        return response.json();
    },
    update: async (id: string, data: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Failed to update category");
        }
        return response.json();
    },
    delete: async (id: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete category");
        }
        return response.json();
    },
}