import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, ProductItem, CreateProductPayload, UpdateProductPayload } from "../../service/productService";

export const useProduct = () => {
  const queryClient = useQueryClient();

  const { data: products, isLoading: isLoadingProducts, error: errorProducts } = useQuery<ProductItem[]>({
    queryKey: ["products"],
    queryFn: productService.getAll,
    select: (data: any) => {
      if (Array.isArray(data)) return data;
      return data?.data || data?.products || [];
    },
  });

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
    createProduct: createProductMutation.mutateAsync,
    isCreating: createProductMutation.isPending,
    updateProduct: updateProductMutation.mutateAsync,
    isUpdating: updateProductMutation.isPending,
    deleteProduct: deleteProductMutation.mutateAsync,
    isDeleting: deleteProductMutation.isPending,
    getProductByIdQuery,
  };
};
