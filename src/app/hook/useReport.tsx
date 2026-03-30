import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportService } from "../../service/reportService";
import { ReportItem } from "../../service/api.types";

export const useReport = (filters: {
  search?: string;
  startDate?: string;
  endDate?: string;
  period?: string;
} = {}) => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isLoadingReports,
    isError: errorReports,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["reports", filters],
    queryFn: ({ pageParam = 1 }) => reportService.getAll(pageParam, 10, filters),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
  // console.log(filters)

  const reports = data?.pages.flatMap((page) => page.data) ?? [];

  const generateReportMutation = useMutation({
    mutationFn: (data: { startDate: string; endDate: string; periodType: string }) => 
      reportService.generateReport(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });

  const deleteReportMutation = useMutation({
    mutationFn: reportService.deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });

  return {
    reports,
    isLoadingReports,
    errorReports,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    generateReport: generateReportMutation.mutateAsync,
    isGenerating: generateReportMutation.isPending,
    deleteReport: deleteReportMutation.mutateAsync,
    isDeleting: deleteReportMutation.isPending,
  };
};
