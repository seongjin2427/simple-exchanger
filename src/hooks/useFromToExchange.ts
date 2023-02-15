import React from "react";
import { ExchangeSymbolType } from "../types/exchange";
import { getExchangeRateByFromTo } from "../api/exchange";

type ExchangeInfoType = ExchangeSymbolType & { value?: string };

const regexp = /^[0-9]*$/;

const useFromToChange = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [exchangeRate, setExchangeRate] = React.useState<number>(1);
  const [from, setFrom] = React.useState<ExchangeInfoType>({
    description: "Select",
    code: "",
    value: "0",
  });

  const [to, setTo] = React.useState<ExchangeInfoType>({
    description: "Select",
    code: "",
    value: "0",
  });

  const fromRef = React.useRef<HTMLInputElement>(null);
  const toRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    (async function () {
      setIsLoading(true);
      const response = await getExchangeRateByFromTo({
        from: from.code,
        to: to.code,
      });

      setIsLoading(false);
      if (response?.success) {
        setExchangeRate(response.result);
      }
    })();
  }, [from.code, to.code]);

  React.useEffect(() => {
    const fromValue = from.value === undefined ? 0 : +from.value;
    const calculatedValue = fromValue * exchangeRate + "";

    setTo((prev) => ({ ...prev, value: calculatedValue }));
  }, [from.value, exchangeRate]);

  const changeFromHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (regexp.test(value)) setFrom({ ...from, value });
  };

  const changeFromCode = (symbol: ExchangeSymbolType) => {
    setFrom({ ...from, ...symbol });
  };

  const changeToHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (regexp.test(value)) setTo({ ...to, value });
  };

  const changeToCode = (symbol: ExchangeSymbolType) =>
    setTo({ ...to, ...symbol });

  return {
    from,
    to,
    fromRef,
    toRef,
    changeFromHandler,
    changeFromCode,
    changeToHandler,
    changeToCode,
    isLoading,
  };
};

export { useFromToChange };
