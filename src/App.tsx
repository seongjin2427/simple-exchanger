import React from "react";

import Select from "./components/Select";
import InputWrapper from "./components/InputWrapper";
import { useFromToChange } from "./hooks/useFromToExchange";
import { useSymbol } from "./hooks/useSymbol";
import { ExchangeSymbolType } from "./types/exchange";

import "./App.css";

function App() {
  const {
    from,
    to,
    fromRef,
    toRef,
    changeFromCode,
    changeFromHandler,
    changeToCode,
    changeToHandler,
    isLoading,
  } = useFromToChange();
  const symbols = useSymbol();

  const makeLabel = (label: ExchangeSymbolType) =>
    `${label.description} ${label.code && "(" + label.code + ")"}`;

  const fromLabel = makeLabel(from);
  const toLabel = makeLabel(to);

  return (
    <div className="App">
      <InputWrapper
        ref={fromRef}
        onChange={changeFromHandler}
        value={from.value}
      >
        <Select dataSet={symbols} onClick={changeFromCode}>
          {isLoading ? <div>Loading...</div> : fromLabel}
        </Select>
      </InputWrapper>
      <InputWrapper ref={toRef} onChange={changeToHandler} value={to.value}>
        <Select dataSet={symbols} onClick={changeToCode}>
          {isLoading ? <div>Loading...</div> : toLabel}
        </Select>
      </InputWrapper>
    </div>
  );
}

export default App;
