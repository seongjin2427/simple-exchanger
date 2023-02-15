import type { AxiosError } from "axios";
import { instance } from "../api/instance";

interface FetcherParams {
  url: string;
  query?: Record<string, string>;
  method: "get" | "post" | "put" | "delete";
}

const fetcher = async <T>({ method, url, query }: FetcherParams) => {
  const queries = "?" + new URLSearchParams(query).toString();

  try {
    const response = await instance[method]<T>(url + queries);

    return response;
  } catch (err) {
    const error = err as AxiosError;
    alert(error.message);
  }
};

export { fetcher };
