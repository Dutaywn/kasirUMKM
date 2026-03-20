import { useMutation, useQuery } from "@tanstack/react-query";
import { productService } from "@/service/prodcutService";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
    // Safely extract the array if the backend wraps it in data or products
    select: (data) => {
      if (Array.isArray(data)) return data;
      return data?.data || data?.products || [];
    },
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: productService.create,
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => productService.update(id, data),
  });
};


export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: productService.delete,
  });
};
