import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService, CreateOrderDTO } from "@/service/orderService";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderDTO) => orderService.createOrder(data),
    onSuccess: () => {
      // Invalidate relevant queries like product stock or order history
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useGetOrder = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getAll,
    // Safely extract the array from the backend response { message, data }
    select: (data) => {
      if (Array.isArray(data)) return data;
      return data?.data || [];
    },
  });
}

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderService.getById(id),
    // Safely extract the single order object from the backend response
    select: (data) => {
      // If the backend returns { message, data: {...} }
      return data?.data || data;
    },
  });
}
