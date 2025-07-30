import React, { useState } from "react";
import { ReportAmounts, ReportItem } from "../../api/report/types";
import { ReportItemRow, TableColumn } from "./type";

type Props = {
  report: ReportItemRow;
  columns: TableColumn<ReportItem>[];
  index: number;
  isParent: boolean;
  deepness?: number;
};

const _getValue = (
  column: TableColumn<ReportItem>,
  report: ReportItemRow | ReportItem
) => {
  if ("isParent" in report) {
    return "dataIndex" in column
      ? column.dataIndex === "name" || column.dataIndex! in report.totals
        ? report.totals[column.dataIndex as keyof ReportAmounts] ?? report.name
        : ""
      : "";
  } else {
    return "dataIndex" in column
      ? column.dataIndex! in report
        ? report[column.dataIndex as keyof ReportItem]
        : ""
      : "";
  }
};

const getValue = (
  column: TableColumn<ReportItem>,
  report: ReportItemRow | ReportItem
) => {
  const value = _getValue(column, report);
  if (typeof value === "object") {
    return JSON.stringify(value);
  } else {
    return value;
  }
};

export const ReportTableRow = React.memo(
  ({ columns, report, index, isParent, deepness = 0 }: Props) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
      <React.Fragment>
        {isParent ? (
          <tr>
            {columns.map((column, columnIndex) => {
              const isFirstColumn = columnIndex === 0;

              return (
                <td
                  className={"border px-1 py-1 border-gray-300"}
                  style={{
                    textAlign: column.cellAlign ?? "left",
                    paddingLeft: isFirstColumn ? `${deepness * 15}px` : "4px",
                    backgroundColor: !collapsed ? "#f3f4f6" : "inherit",
                  }}
                  key={`${index}-${columnIndex}`}
                >
                  {isFirstColumn ? (
                    <button
                      onClick={() => setCollapsed(!collapsed)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      {!collapsed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="256"
                          height="256"
                          viewBox="0 0 256 256"
                          className="w-4 h-4 shrink-0"
                        >
                          <path
                            fill="currentColor"
                            d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-24 104H72a8 8 0 0 1 0-16h112a8 8 0 0 1 0 16"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="256"
                          height="256"
                          viewBox="0 0 256 256"
                          className="w-4 h-4 shrink-0"
                        >
                          <path
                            fill="currentColor"
                            d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-24 104h-48v48a8 8 0 0 1-16 0v-48H72a8 8 0 0 1 0-16h48V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 0 16"
                          />
                        </svg>
                      )}
                      {getValue(column, report)}
                    </button>
                  ) : (
                    getValue(column, report)
                  )}
                </td>
              );
            })}
          </tr>
        ) : (
          <tr key={index}>
            {columns.map((column, columnIndex) => {
              const isFirstColumn = columnIndex === 0;
              return (
                <td
                  className={"border px-1 py-1 border-gray-300"}
                  style={{
                    textAlign: column.cellAlign ?? "left",
                    paddingLeft: isFirstColumn ? `${deepness * 15}px` : "4px",
                  }}
                  key={`${index}-${columnIndex}`}
                >
                  {isFirstColumn && columnIndex + 1}
                  {column.renderCell?.(report as any) ??
                    getValue(column, report)}
                </td>
              );
            })}
          </tr>
        )}
        {!collapsed &&
          report.data?.map((_r, _index) => {
            return (
              <ReportTableRow
                report={_r as any} // TODO: typeda ozgina xatolik bo'lyapti
                columns={columns}
                index={index}
                isParent={_r.isParent}
                deepness={deepness + 1}
              />
            );
          })}
      </React.Fragment>
    );
  }
);
