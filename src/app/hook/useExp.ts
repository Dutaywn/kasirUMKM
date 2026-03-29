import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { expService, CreateExpenditureDTO, UpdateExpenditureDTO } from "../../service/expService";
import { Expenditure } from "../../service/api.types";

export const useExpenditures = (search = "") => {
    const queryClient = useQueryClient();
    const {
        data,
        isLoading: isLoadingExpenditures,
        isError: errorExpenditures,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["expenditures", search],
        queryFn: ({ pageParam = 1 }) => expService.getAll(pageParam, 12, search),
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.pagination;
            return page < totalPages ? page + 1 : undefined;
        },
        initialPageParam: 1,
    });

    const expenditures = data?.pages.flatMap((page) => page.data) ?? [];

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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    createExpenditure: useCreateExpenditure.mutateAsync,
    isCreating: useCreateExpenditure.isPending,
    updateExpenditure: useUpdateExpenditure.mutateAsync,
    isUpdating: useUpdateExpenditure.isPending,
    deleteExpenditure: useDeleteExpenditure.mutateAsync,
    isDeleting: useDeleteExpenditure.isPending,
}
}

