import { ReportAmounts } from "../../api/report/types";
import { ReportTableRow } from "./report-table-row";
import { ReportItemRow } from "./type";
import { useTableConfig } from "./use-table-config";

type Props = {
  reports: ReportItemRow[];
  totals: ReportAmounts;
};

export const ReportsTable = ({ reports, totals }: Props) => {
  const { headRows, columns } = useTableConfig();

  return (
    <table className={"border border-gray-300 border-solid w-full text-[12px]"}>
      <thead>
        {headRows.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((column, index) => {
                return (
                  <th
                    key={index}
                    rowSpan={column.rowSpan}
                    colSpan={column.colSpan}
                    className={
                      "border-gray-300 border-solid border px-[2px] py-1 bg-gray-100"
                    }
                    style={{
                      textAlign: column.headAlign ?? "center",
                      ...column.style,
                    }}
                  >
                    {column.label}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody>
        <tr>
          {columns.map((column, columnIndex) => {
            const isFirstColumn = columnIndex === 0;
            return (
              <td
                className={
                  "border px-1 py-1 border-gray-300 text-left bg-gray-100"
                }
                style={{
                  textAlign: column.headAlign ?? "right",
                }}
                key={columnIndex}
              >
                {isFirstColumn
                  ? "Total"
                  : totals[column.dataIndex as keyof ReportAmounts]}
              </td>
            );
          })}
        </tr>
        {reports.map((report, index) => {
          return (
            <ReportTableRow
              report={report}
              columns={columns}
              index={index}
              key={index}
              isParent
            />
          );
        })}
      </tbody>
    </table>
  );
};
