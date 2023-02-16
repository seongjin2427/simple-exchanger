import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50rem;
  padding: 2.5rem 5rem;
  border: 1px solid #aaaaaa;
  border-radius: 0.25rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const P = styled.p`
  font-size: 1rem;
  color: #aaaaaa;
  margin-bottom: 1rem;
`;

export { Container, Title, P };
