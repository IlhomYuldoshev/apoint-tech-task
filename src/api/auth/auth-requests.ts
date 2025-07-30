import { baseFetch } from "../base-fetch";
import { LoginBody } from "./types";

export const authRequests = {
  login: async (body: LoginBody) => {
    const response = await baseFetch("/hr/user/sign-in?include=token", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};
