import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  * {
    font-size: 1.125rem;
    font-weight: 400;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 0.75rem 1.25rem;
  background: #ffffff;
  border: none;

  :hover {
    background: #eeeeee;
    cursor: pointer;
  }
`;

const List = styled.ul<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    display: ${isOpen ? "block" : "none"};
  `}
  width: 100%;
  max-height: 15rem;
  position: absolute;
  top: 3rem;
  left: 0;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 0.25rem;
  overflow: scroll;
  z-index: 1;
`;

const Item = styled.li<{ current: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  :hover {
    background: #eeeeee;
  }

  ${({ current }) =>
    current &&
    css`
      background: #eeeeee;
      font-weight: bold;
    `}
`;

const ItemButton = styled.button`
  width: 100%;
  padding: 1rem 1.25rem;
  background: none;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

export { Container, Button, List, Item, ItemButton };
