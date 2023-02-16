import React from "react";

import Card from "./components/Card";
import Select from "./components/Select";
import InputWrapper from "./components/InputWrapper";
import { useFromToChange } from "./hooks/useFromToExchange";
import { useSymbol } from "./hooks/useSymbol";
import { ExchangeSymbolType } from "./types/exchange";

function App() {
  const {
    from,
    to,
    changeFromCode,
    changeFromHandler,
    changeToCode,
    changeToHandler,
    isLoading,
  } = useFromToChange();
  const symbols = useSymbol();

  const makeLabel = (label: ExchangeSymbolType) =>
    `${label.description} ${label.code && `(${label.code})`}`;

  const fromLabel = makeLabel(from);
  const toLabel = makeLabel(to);

  return (
    <Card
      title="간단 환율계산기"
      description="국가를 선택하고 금액을 입력하여 환율을 변경해보세요!"
    >
      <InputWrapper onChange={changeFromHandler} value={from.value}>
        <Select dataSet={symbols} onClick={changeFromCode}>
          {isLoading ? <div>Loading...</div> : fromLabel}
        </Select>
      </InputWrapper>
      <InputWrapper onChange={changeToHandler} value={to.value} readOnly>
        <Select dataSet={symbols} onClick={changeToCode}>
          {isLoading ? <div>Loading...</div> : toLabel}
        </Select>
      </InputWrapper>
    </Card>
  );
}

export default App;
