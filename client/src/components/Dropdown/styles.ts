import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const Wrapper  = styled.div`
    position: absolute;
    right: 0;
    top: 60px;
    background: white;
    color: rgba(128, 128, 128,0.5);
    max-height: 400px;
    overflow: scroll;
    cursor: pointer;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 6px;
    width: 300px;
    text-align: center;
    text-transform: capitalize;
    @media (max-width: 700px) {
      right: 37px;
  };
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: #1D1F26;
  display: block;
  font-weight: 500;
`;

export const LinkWrapper = styled.div`
  border-bottom: 1px solid rgba(128, 128, 128,0.3);
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Div = styled.div`
  position: relative;
      @media (max-width: 700px) {
      display: flex;
      justify-content: center;
    ;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
  padding: 0.5rem 0;
  color: white;
  border: 2px solid white;
  font-weight: 700;

`;
