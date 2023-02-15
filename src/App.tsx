import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { getExchangeRateByFromTo, getSymbols } from "./api/exchange";

function App() {
  const test = async () => {
    const result = await getExchangeRateByFromTo({ from: "USD", to: "KRW" });
    const result2 = await getSymbols();
    console.log(result, result2);
  };
  return (
    <div className="App">
      <button onClick={test}>테스트</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
