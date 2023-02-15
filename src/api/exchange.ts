import {
  ExchangeRateResponseType,
  SymbolResponseType,
} from "../types/exchange";
import { fetcher } from "../utils/fetcher";

interface FromToType {
  from: string;
  to: string;
}

const getExchangeRateByFromTo = async ({ from, to }: FromToType) => {
  const response = await fetcher<ExchangeRateResponseType>({
    method: "get",
    url: "/convert",
    query: { from, to },
  });

  return response?.data;
};

const getSymbols = async () => {
  const response = await fetcher<SymbolResponseType>({
    method: "get",
    url: "/symbols",
  });

  return response?.data;
};

export { getExchangeRateByFromTo, getSymbols };
