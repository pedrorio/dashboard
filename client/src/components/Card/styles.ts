import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const StyledCard = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 200px;
    text-transform: capitalize;
    background: #fff;
`;

export const StyledText = styled.h3`
    color: #1D1F26;
    font-size: large;
    font-weight: bold;

`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: #1D1F26;
`;
