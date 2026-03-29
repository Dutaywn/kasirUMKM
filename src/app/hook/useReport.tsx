import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportService } from "../../service/reportService";
import { ReportItem } from "../../service/api.types";

export const useReport = (search = "") => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isLoadingReports,
    isError: errorReports,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["reports", search],
    queryFn: ({ pageParam = 1 }) => reportService.getAll(pageParam, 10, search),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const reports = data?.pages.flatMap((page) => page.data) ?? [];

  const generateDailyMutation = useMutation({
    mutationFn: reportService.generateDaily,
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
    generateDaily: generateDailyMutation.mutateAsync,
    isGenerating: generateDailyMutation.isPending,
    deleteReport: deleteReportMutation.mutateAsync,
    isDeleting: deleteReportMutation.isPending,
  };
};
