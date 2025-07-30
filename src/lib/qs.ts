export const qs = {
  stringify: (params: Record<string, any>): string => {
    const searchParams = new Map<string, string>();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.set(key, String(value));
      }
    });

    return Array.from(searchParams.entries())
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
  },

  parse: (queryString: string): Record<string, string> => {
    const result: Record<string, string> = {};

    if (!queryString || queryString.startsWith("?")) {
      queryString = queryString.slice(1);
    }

    if (!queryString) return result;

    queryString.split("&").forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key) {
        result[decodeURIComponent(key)] = decodeURIComponent(value || "");
      }
    });

    return result;
  },
};
