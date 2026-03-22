import { useMutation, useQueryClient } from "@tanstack/react-query";
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
