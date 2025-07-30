import { ReportAmounts, ReportItem } from "../../api/report/types";
import { groupBy } from "../../lib/group-by";
import { ReportItemRow } from "./type";

function sumTotals(items: ReportItem[]): ReportItemRow["totals"] {
  return items.reduce(
    (acc, item) => {
      acc.remind_end_amount += item.remind_end_amount;
      acc.remind_end_sum += item.remind_end_sum;
      acc.remind_income_amount += item.remind_income_amount;
      acc.remind_income_sum += item.remind_income_sum;
      acc.remind_outgo_amount += item.remind_outgo_amount;
      acc.remind_outgo_sum += item.remind_outgo_sum;
      acc.remind_start_amount += item.remind_start_amount;
      acc.remind_start_sum += item.remind_start_sum;
      return acc;
    },
    {
      remind_end_amount: 0,
      remind_end_sum: 0,
      remind_income_amount: 0,
      remind_income_sum: 0,
      remind_outgo_amount: 0,
      remind_outgo_sum: 0,
      remind_start_amount: 0,
      remind_start_sum: 0,
    }
  );
}

export const prepareReportsData = (
  data: ReportItem[]
): [ReportItemRow[], ReportAmounts] => {
  const groupedData = Object.entries(groupBy(data, (item) => item.parent)).map(
    ([parent, list]) => {
      return {
        isParent: true,
        name: parent,
        totals: sumTotals(list),
        data: Object.entries(groupBy(list, (item) => item.category)).map(
          ([categoryName, reports]) => ({
            isParent: true,
            name: categoryName,
            totals: sumTotals(reports),
            data: reports,
          })
        ),
      };
    }
  );

  return [groupedData, sumTotals(data)];
};
