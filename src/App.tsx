import React from "react";
import "./App.css";
import { getExchangeRateByFromTo, getSymbols } from "./api/exchange";
import Select from "./components/Select";
import { ExchangeSymbolType } from "./types/exchange";

type ExchangeInfoType = ExchangeSymbolType & { value?: string };

function App() {
  const [from, setFrom] = React.useState<ExchangeInfoType>({
    description: "South Korean Won",
    code: "KRW",
    value: "",
  });
  const [to, setTo] = React.useState({
    description: "United States Dollar",
    code: "USD",
    value: "",
  });

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

      <Select>Select</Select>
    </div>
  );
}

export default App;
