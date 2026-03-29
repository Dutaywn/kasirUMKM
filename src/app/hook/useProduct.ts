import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { productService, CreateProductPayload, UpdateProductPayload } from "../../service/productService";
import { ProductItem } from "../../service/api.types";

export const useProduct = (search = "") => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isLoadingProducts,
    isError: errorProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", search],
    queryFn: ({ pageParam = 1 }) => productService.getAll(pageParam, 12, search),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    
  });

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  const createProductMutation = useMutation({
    mutationFn: (data: CreateProductPayload) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductPayload }) => productService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const getProductByIdQuery = (id: string) => {
    return useQuery<ProductItem>({
      queryKey: ["product", id],
      queryFn: () => productService.getById(id),
      enabled: !!id,
    });
  };

  return {
    products,
    isLoadingProducts,
    errorProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    createProduct: createProductMutation.mutateAsync,
    isCreating: createProductMutation.isPending,
    updateProduct: updateProductMutation.mutateAsync,
    isUpdating: updateProductMutation.isPending,
    deleteProduct: deleteProductMutation.mutateAsync,
    isDeleting: deleteProductMutation.isPending,
    getProductByIdQuery,
  };
};
