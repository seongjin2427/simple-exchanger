import React from "react";

import Select from "./components/Select";
import InputWrapper from "./components/InputWrapper";
import { getExchangeRateByFromTo, getSymbols } from "./api/exchange";

import "./App.css";
import { useFromToChange } from "./hooks/useFromToExchange";
import { useSymbol } from "./hooks/useSymbol";

function App() {
  const {
    from,
    to,
    changeFromCode,
    changeFromHandler,
    changeToCode,
    changeToHandler,
  } = useFromToChange();
  const symbols = useSymbol();

  const test = async () => {
    if (to) {
      const result = await getExchangeRateByFromTo({
        from: from.code,
        to: to.code,
      });

      const result2 = await getSymbols();
      console.log(result, result2);
    }
  };

  return (
    <div className="App">
      <button onClick={test}>테스트</button>

      <InputWrapper value={from.value} onChange={changeFromHandler}>
        <Select dataSet={symbols} onClick={changeFromCode}>
          {from.description} {from.code && `(${from.code})`}
        </Select>
      </InputWrapper>
      <InputWrapper value={to.value} onChange={changeToHandler}>
        <Select dataSet={symbols} onClick={changeToCode}>
          {to.description} {to.code && `(${to.code})`}
        </Select>
      </InputWrapper>
    </div>
  );
}

export default App;
