import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportService, ReportItem } from "../../service/reportService";

export const useReport = () => {
  const queryClient = useQueryClient();

  const { data: reports, isLoading: isLoadingReports, error: errorReports } = useQuery<ReportItem[]>({
    queryKey: ["reports"],
    queryFn: reportService.getAll,
  });

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
    generateDaily: generateDailyMutation.mutateAsync,
    isGenerating: generateDailyMutation.isPending,
    deleteReport: deleteReportMutation.mutateAsync,
    isDeleting: deleteReportMutation.isPending,
  };
};
