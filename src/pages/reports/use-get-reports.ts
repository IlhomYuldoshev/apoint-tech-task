import { useEffect, useState } from "react";
import { reportRequests } from "../../api/report/report-requests";
import { getEndOfMonth, getStartOfMonth } from "../../lib/date";
import { toast } from "../../lib/toast";
import { ReportItemRow } from "./type";
import { prepareReportsData } from "./prepare-data";
import { ReportAmounts } from "../../api/report/types";

export function useGetReports() {
  const [data, setData] = useState<{
    list: ReportItemRow[];
    totals: ReportAmounts;
  }>({
    list: [],
    totals: {
      remind_income_amount: 0,
      remind_income_sum: 0,
      remind_end_amount: 0,
      remind_end_sum: 0,
      remind_outgo_amount: 0,
      remind_outgo_sum: 0,
      remind_start_amount: 0,
      remind_start_sum: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // NOTE: productionda request uchun biror wrapper yozib qo'yilsa yoki library ishlatilsa chunarliroq kod chiqadi
  const getReportsRequest = async () => {
    try {
      abortController?.abort();
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      setIsLoading(true);
      const response = await reportRequests.getReports(
        {
          start: getStartOfMonth(),
          end: getEndOfMonth(),
          sort: "name",
        },
        newAbortController.signal
      );
      const [list, totals] = prepareReportsData(response);
      setData({ list, totals });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      toast.error("Failed to load reports");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReportsRequest();
    return () => {
      abortController?.abort();
    };
  }, []);

  return {
    data,
    isLoading,
    refetch: getReportsRequest,
  };
}
