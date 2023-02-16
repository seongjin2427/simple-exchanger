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
  const targetRef = React.useRef<HTMLDivElement>(null);

  const toggleOpen = (bool: boolean) => setIsOpen(bool);
  const clickHandler = (symbol: ExchangeSymbolType) => {
    if (onClick) onClick(symbol);
    toggleOpen(false);
  };

  React.useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (targetRef.current && !targetRef.current.contains(target)) {
        toggleOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isOpen]);

  const current = React.useMemo(() => {
    if (typeof children === "string") {
      const index = children.indexOf("(");
      return children.substring(index + 1, index + 4);
    }
  }, [children]);

  return (
    <Styled.Container ref={targetRef}>
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
            <Styled.Item key={code} current={current === code}>
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
