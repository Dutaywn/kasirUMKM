import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { orderService, CreateOrderDTO } from "@/service/orderService";
import { PaginatedResponse, Order } from "@/service/api.types";

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

export const useGetOrder = (search = "") => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["orders", search],
    queryFn: ({ pageParam = 1 }) => orderService.getAll(pageParam, 10, search),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const orders = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    orders,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

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
