import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchVariableNames, selectActiveVariable } from "../../actions";
import { ActiveCensusVariableState } from "../../reducers/activeCensusVariable";
import { CensusVariableNamesState } from "../../reducers/censusVariableNames";
import { Card } from "../Card/Card";
import { Div } from "./styles";

class SimpleCardList extends React.Component<IMapStateToProps & IMapDispatchToProps, {}> {

    public componentDidMount() {
        this.props.fetchVariableNames();
    }

    public renderCards() {
        return this.props.censusVariableNames.map((variable) => {
            return (
                <Card key={variable} title={variable} />
            );
        });
    }

    public render() {
      return (
            <Div>
                {this.renderCards()}
            </Div>
        );
    }
}

const mapStateToProps = (state, ownProps): IMapStateToProps => {
    return {
        censusVariableNames: state.censusVariableNames,
    };
};

interface IMapStateToProps {
  censusVariableNames: CensusVariableNamesState;
  activeCensusVariable?: ActiveCensusVariableState;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchVariableNames: () => dispatch(fetchVariableNames()),
    selectActiveVariable: (variableName) => dispatch(selectActiveVariable(variableName)),
});

interface IMapDispatchToProps {
  fetchVariableNames: typeof fetchVariableNames;
  selectActiveVariable: typeof selectActiveVariable;
}

export const CardList = connect(mapStateToProps, mapDispatchToProps)(SimpleCardList);
