import styled from "styled-components";

export const Div  = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
  justify-self: stretch;
  align-self: stretch;
  padding: 20px;
`;
