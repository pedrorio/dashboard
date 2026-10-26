import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import {
    fetchPaginatedData,
    fetchVariableNames,
    selectActiveVariable,
} from "../../actions";
import { ActiveCensusVariableState } from "../../reducers/activeCensusVariable";
import { ICensusPaginatedVariableDataState } from "../../reducers/censusPaginatedData";
import { CensusVariableNamesState } from "../../reducers/censusVariableNames";
import { Caption, Div, Table, TableFrame, Td, Th } from "./styles";

interface IParams {
  variableName: string;
}

type IDataProps = IMapStateToProps & IMapDispatchToProps & RouteComponentProps<IParams>;

class SimpleData extends React.Component<IDataProps, {}> {

  public componentDidMount() {
    this.reconcileRoute();
  }

  public componentDidUpdate(prevProps: IDataProps) {
    const nameChanged = prevProps.match.params.variableName !== this.props.match.params.variableName;
    if (nameChanged || this.namesLength(prevProps) !== this.namesLength(this.props)) {
      this.reconcileRoute(prevProps);
    }
  }

  public renderRows() {
    const { activeCensusVariable } = this.props;
    const { variableName } = this.props.match.params;

    return this.props.censusPaginatedData.paginatedVariableData.map((variable) => {
      return (
        <tr key={variable[variableName || activeCensusVariable]}>
          <Td>{variable[variableName || activeCensusVariable]}</Td>
          <Td>{variable.counter}</Td>
          <Td>{variable.average}</Td>
        </tr>
      );
    });
  }

  public render() {
    const { variableName } = this.props.match.params;
    const { activeCensusVariable } = this.props;

    if (!this.rowsMatch(variableName)) {
      return null;
    }

    return (
      <Div>
        <TableFrame>
          <Table>
            <Caption>{`Results for ${variableName || activeCensusVariable}`}</Caption>
            <thead>
              <tr>
                <Th scope="col">{variableName || activeCensusVariable}</Th>
                <Th scope="col">Count</Th>
                <Th scope="col">Average Age</Th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </Table>
        </TableFrame>
        <p>Page number {this.props.censusPaginatedData.pageNumber}</p>
        <p>{this.props.censusPaginatedData.remainingTotalCount} more responses</p>
        <p>{this.props.censusPaginatedData.remainingUniqueValuesCount} more variable responses</p>
      </Div>
    );
  }

  private namesLength(props: IDataProps) {
    return props.censusVariableNames ? props.censusVariableNames.length : 0;
  }

  private rowsMatch(variableName: string) {
    const rows = this.props.censusPaginatedData.paginatedVariableData;
    return rows[0] !== undefined && Object.keys(rows[0]).indexOf(variableName) !== -1;
  }

  private reconcileRoute(prevProps?: IDataProps) {
    const { variableName } = this.props.match.params;
    const names = this.props.censusVariableNames;
    if (names === undefined || names.length === 0) {
      return;
    }
    if (!names.includes(variableName)) {
      this.props.history.push("/catch");
      return;
    }

    const routeChanged = prevProps !== undefined && prevProps.match.params.variableName !== variableName;
    const firstResolution = prevProps === undefined || this.namesLength(prevProps) === 0;
    this.props.selectActiveVariable(variableName);
    if (routeChanged || !(firstResolution && this.rowsMatch(variableName))) {
      this.props.fetchPaginatedData(variableName);
    }
  }
}

const mapStateToProps = (state): IMapStateToProps => {
  return {
    activeCensusVariable: state.activeCensusVariable,
    censusPaginatedData: state.censusPaginatedData,
    censusVariableNames: state.censusVariableNames,
  };
};

interface IMapStateToProps {
  activeCensusVariable: ActiveCensusVariableState;
  censusPaginatedData: ICensusPaginatedVariableDataState;
  censusVariableNames: CensusVariableNamesState;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchPaginatedData: (variableName) => dispatch(fetchPaginatedData(variableName)),
  fetchVariableNames: () => dispatch(fetchVariableNames()),
  selectActiveVariable: (variableName) => dispatch(selectActiveVariable(variableName)),
});

interface IMapDispatchToProps {
  fetchPaginatedData: typeof fetchPaginatedData;
  fetchVariableNames: typeof fetchVariableNames;
  selectActiveVariable: typeof selectActiveVariable;
}

export const Data = connect(mapStateToProps, mapDispatchToProps)(SimpleData);
