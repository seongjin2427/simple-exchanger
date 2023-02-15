import React from "react";
import { ExchangeSymbolType } from "../types/exchange";
import { getSymbols } from "../api/exchange";

const useSymbol = () => {
  const [exchangeSymbols, setExchangeSymbols] = React.useState<
    ExchangeSymbolType[]
  >([]);

  React.useEffect(() => {
    (async function () {
      const data = await getSymbols();
      if (data?.success) {
        const symbols = Object.values(data.symbols);
        setExchangeSymbols(symbols);
      }
    })();
  }, []);

  return exchangeSymbols;
};

export { useSymbol };
