import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    fetchPaginatedData,
    fetchVariableNames,
    selectActiveVariable,
} from "../../actions";
import {ActiveCensusVariableState} from "../../reducers/activeCensusVariable";
import {CensusVariableNamesState} from "../../reducers/censusVariableNames";
import { Link, StyledCard, StyledText } from "./styles";

type CardProps = IOwnProps & IMapDispatchToProps & IMapStateToProps;

interface IOwnProps {
    title: string;
}

class SimpleCard extends React.Component<CardProps, {}> {

    public onClick = () => {
        this.props.selectActiveVariable(this.props.title);
    }

    public render() {
        const { title } = this.props;
        return (
            <Link to={`/explorer/${title}`} onClick={this.onClick}>
                <StyledCard>
                    <StyledText>{this.props.title}</StyledText>
                </StyledCard>
            </Link>
        );
    }
}

interface IMapStateToProps {
    censusVariables: CensusVariableNamesState;
    activeCensusVariable: ActiveCensusVariableState;
}

const mapStateToProps = (state) => ({
    activeCensusVariable: state.activeCensusVariable,
    censusVariableData: state.censusVariableData,
    censusVariables: state.censusVariables,
    totalCountRemaining: state.totalCountRemaining,
    uniqueCountRemaining: state.uniqueCountRemaining,
});

interface IMapDispatchToProps {
    fetchVariableNames: typeof fetchVariableNames;
    selectActiveVariable: typeof selectActiveVariable;
    fetchPaginatedData: typeof fetchPaginatedData;
    onClick: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchPaginatedData: (variableName) => dispatch(fetchPaginatedData(variableName)),
    fetchVariableNames: () => dispatch(fetchVariableNames()),
    onClick: (variableName) => this.props.selectActiveVariable(variableName),
    selectActiveVariable: (variableName) => dispatch(selectActiveVariable(variableName)),
});

export const Card = connect(mapStateToProps, mapDispatchToProps)(SimpleCard);
