import React from "react";
import * as Styled from "./Card.styled";

interface Props {
  children?: React.ReactNode;
  title: string;
  description: string;
}

const Card = ({ children, title, description }: Props) => {
  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      <Styled.P>{description}</Styled.P>
      {children}
    </Styled.Container>
  );
};

export default Card;
