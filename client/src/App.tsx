import * as React from "react";
import { Fragment } from "react";
import { Route, RouteProps, Switch } from "react-router-dom";
import { CardList } from "./components/CardList/CardList";
import NavBar from "./components/NavBar/NavBar";
import NoMatch from "./components/NoMatch/NoMatch";
import { Data } from "./components/Table/Data";

export class App extends React.Component<IProps & RouteProps, IState> {
  constructor(props) {
    super(props);
  }

  public render() {
        return (
            <Fragment>
                <NavBar/>
               <Switch>
                 <Route path={"/"} exact={true} component={CardList}/>
                 <Route path={"/explorer/:variableName"} component={Data}/>
                 <Route component={NoMatch} />
               </Switch>
            </Fragment>
        );
    }
}

interface IProps {
    // children: React.ReactChild | React.ReactChildren | React.ReactNode | React.ReactNodeArray;
}

interface IState {

}
