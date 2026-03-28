import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { expService, CreateExpenditureDTO, UpdateExpenditureDTO, Expenditure } from "../../service/expService";
export const useExpenditures = () => {
    const queryClient = useQueryClient();
    const { data: expenditures, isLoading: isLoadingExpenditures, error: errorExpenditures } = useQuery<Expenditure[]>({
        queryKey: ["expenditures"],
        queryFn: expService.getAll,
        select: (data: any) => {
            if (Array.isArray(data)) return data;
            return data?.data || [];
        },
    });

    const useCreateExpenditure = useMutation({
        mutationFn: (data: CreateExpenditureDTO) => expService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenditures"] });
        },
    })

    const useUpdateExpenditure = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateExpenditureDTO }) =>
            expService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenditures"] });
        },
    });

    const useDeleteExpenditure = useMutation({
        mutationFn: (id: string) => expService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenditures"] });
        },
    });
return {
    expenditures,
    isLoadingExpenditures,
    errorExpenditures,
    createExpenditure: useCreateExpenditure.mutateAsync,
    isCreating: useCreateExpenditure.isPending,
    updateExpenditure: useUpdateExpenditure.mutateAsync,
    isUpdating: useUpdateExpenditure.isPending,
    deleteExpenditure: useDeleteExpenditure.mutateAsync,
    isDeleting: useDeleteExpenditure.isPending,
}
}

