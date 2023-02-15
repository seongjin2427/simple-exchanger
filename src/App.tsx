import React from "react";

import Select from "./components/Select";
import InputWrapper from "./components/InputWrapper";
import { ExchangeSymbolType } from "./types/exchange";
import { getExchangeRateByFromTo, getSymbols } from "./api/exchange";

import "./App.css";

type ExchangeInfoType = ExchangeSymbolType & { value?: string };

function App() {
  const [from, setFrom] = React.useState<ExchangeInfoType>({
    description: "Select",
    code: "",
    value: "",
  });
  const [to, setTo] = React.useState({
    description: "Select",
    code: "",
    value: "",
  });

  const changeFromHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regexp = /^[0-9]+$/;
    const value = e.target.value;

    if (regexp.test(value)) setFrom({ ...from, value });
  };

  const test = async () => {
    const result = await getExchangeRateByFromTo({
      from: from.code,
      to: to.code,
    });
    const result2 = await getSymbols();
    console.log(result, result2);
  };

  return (
    <div className="App">
      <button onClick={test}>테스트</button>

      <InputWrapper value={from.value} onChange={changeFromHandler}>
        <Select>
          {from.description} {from.code ?? `(${from.code})`}
        </Select>
      </InputWrapper>
      <InputWrapper defaultValue={to.value}>
        <Select>
          {to.description} {to.code ?? `(${to.code})`}
        </Select>
      </InputWrapper>
    </div>
  );
}

export default App;
