import React from "react";
import * as Styled from "./Select.styled";

import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../assets/arrow-up.svg";
import { ExchangeSymbolType } from "../../types/exchange";

interface Props {
  children?: React.ReactNode;
  onClick?: (s: ExchangeSymbolType) => void;
  dataSet?: ExchangeSymbolType[];
}

const Select = ({ children, onClick, dataSet }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = (bool: boolean) => setIsOpen(bool);
  const clickHandler = (symbol: ExchangeSymbolType) => {
    if (onClick) onClick(symbol);
    toggleOpen(false);
  };

  return (
    <Styled.Container>
      <Styled.Button onClick={() => toggleOpen(!isOpen)}>
        {children}
        {isOpen ? (
          <ArrowUp width="1rem" height="1rem" />
        ) : (
          <ArrowDown width="1rem" height="1rem" />
        )}
      </Styled.Button>
      <Styled.List isOpen={isOpen}>
        {dataSet &&
          dataSet.map(({ description, code }) => (
            <Styled.Item key={code}>
              <Styled.ItemButton
                onClick={() => clickHandler({ description, code })}
              >
                {description} ({code})
              </Styled.ItemButton>
            </Styled.Item>
          ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default Select;
