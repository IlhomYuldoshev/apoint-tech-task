import { useMemo } from "react";
import { ReportItem } from "../../api/report/types";
import { TableColumn } from "./type";
import { formatPrice } from "../../lib/number";

const prepareHeadRows = (
  acc: TableColumn<ReportItem>[][],
  column: TableColumn<ReportItem>,
  currentDeep: number = 0
): TableColumn<ReportItem>[][] => {
  if (!acc[currentDeep]) {
    acc[currentDeep] = [];
  }

  acc[currentDeep].push(column);
  if ("children" in column) {
    // TODO: negadir type yo'qolib qoldi
    (column.children as TableColumn<ReportItem>[]).map((childColumn) => {
      prepareHeadRows(acc, childColumn, currentDeep + 1);
    });
  }
  return acc;
};

const prepareColumns = (
  acc: TableColumn<ReportItem>[]
): TableColumn<ReportItem>[] => {
  return acc.flatMap((row) => {
    if (row.children) {
      return prepareColumns(row.children);
    }
    return [row];
  });
};

const HEAD: TableColumn<ReportItem>[] = [
  {
    label: "Name",
    dataIndex: "name",
    rowSpan: 2,
    colSpan: 1,
    headAlign: "left",
    style: {
      width: "220px",
    },
  },
  {
    label: "Color",
    dataIndex: "color",
    rowSpan: 2,
    colSpan: 1,
    style: {
      width: "80px",
    },
    renderCell() {
      return <div className="w-4 h-4 bg-gray-500 rounded-full" />;
    },
  },
  {
    label: "Measurement",
    dataIndex: "unit",
    rowSpan: 2,
    colSpan: 1,
    style: {
      width: "100px",
    },
  },
  {
    label: "Articul",
    dataIndex: "material_id",
    rowSpan: 2,
    colSpan: 1,
    style: {
      width: "80px",
    },
  },
  {
    label: "Price",
    dataIndex: "last_price",
    rowSpan: 2,
    colSpan: 1,
    cellAlign: "right",
    style: {
      width: "100px",
    },
    renderCell(data) {
      return <div>{formatPrice(data.last_price)}</div>;
    },
  },
  {
    label: "Beginning Saldo",
    rowSpan: 1,
    colSpan: 2,
    style: {
      backgroundColor: "lightgreen",
    },
    children: [
      {
        label: "Quantity",
        rowSpan: 1,
        colSpan: 1,
        dataIndex: "remind_start_amount",
        cellAlign: "right",
        renderCell(data) {
          return <div>{formatPrice(data.remind_start_amount)}</div>;
        },
        style: {
          backgroundColor: "lightgreen",
          width: "100px",
        },
      },
      {
        label: "Sum",
        rowSpan: 1,
        colSpan: 1,
        dataIndex: "remind_start_sum",
        cellAlign: "right",
        renderCell(data) {
          return <div>{formatPrice(data.remind_start_sum)}</div>;
        },
        style: {
          backgroundColor: "lightgreen",
          width: "100px",
        },
      },
    ],
  },
  {
    label: "Income",
    rowSpan: 1,
    colSpan: 2,
    style: {
      backgroundColor: "lightblue",
    },
    children: [
      {
        label: "Quantity",
        rowSpan: 1,
        colSpan: 1,
        dataIndex: "remind_income_amount",
        cellAlign: "right",
        renderCell(data) {
          return <div>{formatPrice(data.remind_income_amount)}</div>;
        },
        style: {
          backgroundColor: "lightblue",
          width: "100px",
        },
      },
      {
        label: "Sum",
        rowSpan: 1,
        colSpan: 1,
        dataIndex: "remind_income_sum",
        cellAlign: "right",
        renderCell(data) {
          return <div>{formatPrice(data.remind_income_sum)}</div>;
        },
        style: {
          backgroundColor: "lightblue",
          width: "100px",
        },
      },
    ],
  },
  {
    label: "Outgoing",
    rowSpan: 1,
    colSpan: 2,
    style: {
      backgroundColor: "lightpink",
    },
    children: [
      {
        label: "Quantity",
        rowSpan: 1,
        colSpan: 1,
        dataIndex: "remind_outgo_amount",
        cellAlign: "right",
        renderCell(data) {
          return <div>{formatPrice(data.remind_outgo_amount)}</div>;
        },
        style: {
          backgroundColor: "lightpink",
          width: "100px",
        },
      },
      {
        label: "Sum",
        rowSpan: 1,
        colSpan: 1,
        dataIndex: "remind_outgo_sum",
        cellAlign: "right",
        renderCell(data) {
          return <div>{formatPrice(data.remind_outgo_sum)}</div>;
        },
        style: {
          backgroundColor: "lightpink",
          width: "100px",
        },
      },
    ],
  },
  {
    label: "Ending Saldo",
    rowSpan: 1,
    colSpan: 2,
    style: {
      backgroundColor: "lightyellow",
    },
    children: [
      {
        label: "Quantity",
        rowSpan: 1,
        colSpan: 1,
        dataIndex: "remind_end_amount",
        cellAlign: "right",
        renderCell(data) {
          return <div>{formatPrice(data.remind_end_amount)}</div>;
        },
        style: {
          backgroundColor: "lightyellow",
          width: "100px",
        },
      },
      {
        label: "Sum",
        rowSpan: 1,
        colSpan: 1,
        dataIndex: "remind_end_sum",
        cellAlign: "right",
        renderCell(data) {
          return <div>{formatPrice(data.remind_end_sum)}</div>;
        },
        style: {
          backgroundColor: "lightyellow",
          width: "100px",
        },
      },
    ],
  },
];

export const useTableConfig = () => {
  const headRows = useMemo(() => {
    return HEAD.reduce((acc, item) => {
      return prepareHeadRows(acc, item, 0);
    }, [] as TableColumn<ReportItem>[][]);
  }, []);

  const columns = useMemo(() => {
    return prepareColumns(HEAD);
  }, []);

  return {
    headRows,
    columns,
  };
};
