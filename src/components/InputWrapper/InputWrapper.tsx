import React from "react";
import * as Styled from "./InputWrapper.styled";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const Input = (
  { children, ...rest }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <Styled.Container>
      <Styled.Input ref={ref} {...rest} />
      {children}
    </Styled.Container>
  );
};

export default React.forwardRef(Input);
