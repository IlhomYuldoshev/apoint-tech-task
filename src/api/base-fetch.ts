import { API_URL, AUTH_TOKEN_KEY } from "../configs/constants";

const requestInterceptor = (
  url: string,
  options: RequestInit
): [string, RequestInit] => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };
  if (token && !("Authorization" in (options.headers ?? {}))) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return [url, options];
};

const responseInterceptor = (response: Response) => {
  if (response.status === 401 && !response.url.includes("/user/sign-in")) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.location.href = "/login";
  }

  if (!response.ok) {
    throw response;
  }

  return response;
};

export const baseFetch = async (
  url: string,
  options: RequestInit,
  getJson = true
) => {
  let finalUrl = url;
  let finalOptions = options;

  [finalUrl, finalOptions] = requestInterceptor(finalUrl, finalOptions);

  let response = await fetch(`${API_URL}/v1${finalUrl}`, finalOptions)
    .then(responseInterceptor)
    .catch(responseInterceptor);

  if (getJson) {
    return response.json();
  }
  return response;
};
