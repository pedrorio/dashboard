import * as React from "react";
import { Fragment } from "react";
import { Provider } from "react-redux";
import { setupStore } from "./setupStore";
import { GlobalStyle } from "./styles/global";

interface IRootProps {
  children?: any;
}

const store = setupStore();

const Root = (props: IRootProps) => {
  return (
    <Fragment>
      <GlobalStyle/>
      <Provider store={store}>
          {props.children}
      </Provider>
    </Fragment>
  );
};

export default Root;
