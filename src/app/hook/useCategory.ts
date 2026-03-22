import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/service/categoryService";

export interface Category {
    id: number;
    name: string;
}

export const useGetCategory = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: categoryService.getAll,
        // Safely extract the array from the backend response { message, data }
        select: (data) => {
            if (Array.isArray(data)) return data;
            return data?.data || [];
        },
    });
}

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => categoryService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => categoryService.update(data.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => categoryService.delete(data.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}
