import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #aaaaaa;
  border-radius: 0.25rem;
`;

const Input = styled.input`
  width: 12.5rem;
  height: 2.25rem;
  padding: 0 0.75rem;
  border: none;
  border-right: 1px solid #aaaaaa;
  outline: none;
  font-size: 1.25rem;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :read-only {
    color: #cccccc;
  }
`;

export { Container, Input };
