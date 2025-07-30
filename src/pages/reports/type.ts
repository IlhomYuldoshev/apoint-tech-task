import { ReportAmounts, ReportItem } from "../../api/report/types";

export type TableColumn<Data extends Object> = {
  label: string;
  rowSpan: number;
  colSpan: number;
  headAlign?: "left" | "center" | "right";
  cellAlign?: "left" | "center" | "right";
  style?: React.CSSProperties;

  renderHead?: () => React.ReactNode;
  renderCell?: (rowData: Data) => React.ReactNode;
  dataIndex?: keyof Data;
  children?: TableColumn<Data>[];
} & ({} | {});

export type ReportItemRow = {
  isParent: boolean;
  name: string;
  totals: ReportAmounts;
  data: {
    isParent: boolean;
    name: string;
    totals: ReportAmounts;
    data: ReportItem[];
  }[];
};
