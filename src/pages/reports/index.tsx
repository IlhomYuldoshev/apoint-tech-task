import React from "react";
import { useGetReports } from "./use-get-reports";
import { ReportsTable } from "./reports-table";
import { BottomTopScroller } from "../../components/to-bottom";

const ReportsPage = () => {
  const { data, isLoading } = useGetReports();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <span className="text-xl">Loading reports...</span>
        </div>
      ) : (
        <ReportsTable reports={data.list} totals={data.totals} />
      )}

      <BottomTopScroller />
    </div>
  );
};

export default ReportsPage;
