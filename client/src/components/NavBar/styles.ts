import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background-color: palevioletred;
  color: white;
  font-size: medium;
  font-weight: bold;

  @media (max-width: 700px) {
    display: block;
    text-align: center;
    padding: 20px 0;
  }
`;

export const LinkWrapper = styled.div`
  @media (max-width: 700px) {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
  };
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: white;
`;
