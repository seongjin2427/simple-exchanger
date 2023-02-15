import React from "react";
import { ExchangeSymbolType } from "../types/exchange";

type ExchangeInfoType = ExchangeSymbolType & { value?: string };

const regexp = /^[0-9]*$/;

const useFromToChange = () => {
  const [from, setFrom] = React.useState<ExchangeInfoType>({
    description: "Select",
    code: "",
    value: "",
  });

  const [to, setTo] = React.useState<ExchangeInfoType>({
    description: "Select",
    code: "",
    value: "",
  });

  const changeFromHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (regexp.test(value)) setFrom({ ...from, value });
  };

  const changeFromCode = (symbol: ExchangeSymbolType) =>
    setFrom({ ...from, ...symbol });

  const changeToHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (regexp.test(value)) setTo({ ...to, value });
  };

  const changeToCode = (symbol: ExchangeSymbolType) =>
    setTo({ ...to, ...symbol });

  return {
    from,
    to,
    changeFromHandler,
    changeFromCode,
    changeToHandler,
    changeToCode,
  };
};

export { useFromToChange };
