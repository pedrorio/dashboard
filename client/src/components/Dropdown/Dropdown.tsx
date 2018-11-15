import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchPaginatedData, fetchVariableNames, selectActiveVariable } from "../../actions";
import { ActiveCensusVariableState } from "../../reducers/activeCensusVariable";
import { ICensusPaginatedVariableDataState } from "../../reducers/censusPaginatedData";
import { CensusVariableNamesState } from "../../reducers/censusVariableNames";
import { Button, Div, Link, LinkWrapper, Wrapper } from "./styles";

type IDropdownProps = IMapStateToProps & IMapDispatchToProps;

interface IDropdownState {
  isOpen: boolean;
}

let timer;

class SimpleDropdown extends React.Component<IDropdownProps, IDropdownState> {

  public state = {
    isOpen: false,
  } as IDropdownState;

  public componentDidMount() {
    this.props.fetchVariableNames();
  }

  public onMouseOver = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!this.state.isOpen) {
        this.setState({isOpen: true});
      }
    }, 300);
  }

  public onMouseOut = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (this.state.isOpen) {
        this.setState({isOpen: false});
      }
    }, 100);
  }

  public onClick = (event) => {
    this.props.selectActiveVariable(event.target.id);
  }

  public renderDropdownList() {
    return this.props.censusVariableNames.map((variable) => {
      return (
        <LinkWrapper key={variable}>
          <Link
            onClick={this.onClick}
            to={`/explorer/${variable}`}
            id={variable}
          >
            {variable}
          </Link>
        </LinkWrapper>
      );
    });
  }

  public renderDropdown() {
    if (this.state.isOpen) {
      return (
        <Wrapper>
          {this.renderDropdownList()}
        </Wrapper>
      );
    }
  }

  public render() {
    return (
     <Div
       onMouseOver={this.onMouseOver}
       onMouseOut={this.onMouseOut}
     >
       <Button>
         Data Variable
       </Button>
       {this.renderDropdown()}
     </Div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCensusVariable: state.activeCensusVariable,
    censusPaginatedData: state.censusPaginatedData,
    censusVariableNames: state.censusVariableNames,
  };
};

interface IMapStateToProps {
  censusVariableNames: CensusVariableNamesState;
  activeCensusVariable: ActiveCensusVariableState;
  censusPaginatedData: ICensusPaginatedVariableDataState;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPaginatedData: (variableName) => dispatch(fetchPaginatedData(variableName)),
  fetchVariableNames: () => dispatch(fetchVariableNames()),
  selectActiveVariable: (variableName) => dispatch(selectActiveVariable(variableName)),
});

interface IMapDispatchToProps {
  fetchVariableNames: typeof fetchVariableNames;
  selectActiveVariable: typeof selectActiveVariable;
  fetchPaginatedData: typeof  fetchPaginatedData;
}

export const Dropdown = connect(mapStateToProps, mapDispatchToProps)(SimpleDropdown);
