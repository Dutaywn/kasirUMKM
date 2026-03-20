export const productService = {
  async getAll() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },
  async create(data: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    return response.json();
  },
  async update(id: string, data: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    return response.json();
  },
  async delete(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    return response.json();
  }, 
  async getById(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return response.json();
  },  
}
