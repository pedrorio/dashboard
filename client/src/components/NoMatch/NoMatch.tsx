import * as React from "react";
import { Div, H1, H2, Wrapper } from "./styles";

interface INoMatchProps {
}

const NoMatch = (props: INoMatchProps) => {
  return (
    <Wrapper>
     <div>
       <H1>404</H1>
       <Div>
         <H2>This page could not be found.</H2>
       </Div>
     </div>
    </Wrapper>
  );
};

export default NoMatch;
