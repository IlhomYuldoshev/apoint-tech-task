import { qs } from "../../lib/qs";
import { baseFetch } from "../base-fetch";
import { GetReportsParams } from "./types";

export const reportRequests = {
  getReports: async (params: GetReportsParams, signal?: AbortSignal) => {
    const URL = `/reports/reports/materials?${qs.stringify(params)}`;
    const response = await baseFetch(URL, {
      method: "GET",
      signal,
    });
    return response;
  },
};
