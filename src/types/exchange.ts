interface ExchangeRateResponseType {
  date: string;
  result: number;
  success: boolean;
}

interface ExchangeSymbolType {
  description: string;
  code: string;
}

interface SymbolResponseType {
  success: boolean;
  symbols: {
    [key: string]: ExchangeSymbolType;
  };
}

export type {
  ExchangeRateResponseType,
  ExchangeSymbolType,
  SymbolResponseType,
};
