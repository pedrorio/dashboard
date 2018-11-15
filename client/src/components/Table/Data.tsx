import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import {Dispatch} from "redux";
import {
    fetchPaginatedData,
    fetchVariableNames,
    selectActiveVariable,
} from "../../actions";
import {ActiveCensusVariableState} from "../../reducers/activeCensusVariable";
import {ICensusPaginatedVariableDataState} from "../../reducers/censusPaginatedData";
import {CensusVariableNamesState} from "../../reducers/censusVariableNames";
import { Div, Table, TableBodyWrapper, TableHeaderWrapper, Td, Th } from "./styles";

interface IParams {
  variableName: string;
}

class SimpleData extends React.Component<IMapStateToProps & IMapDispatchToProps & RouteComponentProps<IParams>, {}> {

      public componentDidMount() {
        const { variableName } = this.props.match.params;

        if (!(this.props.censusPaginatedData.paginatedVariableData[0] !== undefined &&
          Object.keys(this.props.censusPaginatedData.paginatedVariableData[0]).includes(variableName)
        )) {
          if (this.props.censusVariableNames !== undefined && this.props.censusVariableNames.length !== 0) {
            if ( !this.props.censusVariableNames.includes(variableName)) {
              this.props.history.push("/catch");
            } else {
              this.props.selectActiveVariable(variableName);
              this.props.fetchPaginatedData(variableName);
            }

          }
        }
      }

    public componentWillReceiveProps(nextProps) {
      const { variableName } = this.props.match.params;
      if (variableName !== nextProps.match.params.variableName) {
        this.props.fetchPaginatedData(nextProps.activeCensusVariable);
      }
      if (typeof nextProps.censusVariableNames !== "undefined" &&
        nextProps.censusVariableNames.length !== 0 &&
        typeof this.props.censusVariableNames !== "undefined" &&
        nextProps.censusVariableNames.length !== this.props.censusVariableNames.length) {
          if ( !nextProps.censusVariableNames.includes(variableName)) {
            this.props.history.push("/catch");
          } else {
            this.props.selectActiveVariable(variableName);
            this.props.fetchPaginatedData(variableName);
          }

        }
    }

  public renderRows() {
    const {activeCensusVariable} = this.props;

    const {variableName} = this.props.match.params;

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
   const {variableName} = this.props.match.params;
   const {activeCensusVariable} = this.props;


   if (!(this.props.censusPaginatedData.paginatedVariableData[0] !== undefined &&
     Object.keys(this.props.censusPaginatedData.paginatedVariableData[0]).includes(variableName)
   )) { return null; }

   return (
      <Div>
        <TableHeaderWrapper>
          <Table>
            <thead>
            <tr>
              <Th>{variableName || activeCensusVariable}</Th>
              <Th>Count</Th>
              <Th>Average Age</Th>
            </tr>
            </thead>
          </Table>
        </TableHeaderWrapper>
        <TableBodyWrapper>
          <Table>
            <tbody>
            {this.renderRows()}
            </tbody>
          </Table>
        </TableBodyWrapper>
        <p>Page number {this.props.censusPaginatedData.pageNumber}</p>
        <p>{this.props.censusPaginatedData.remainingTotalCount} more responses</p>
        <p>{this.props.censusPaginatedData.remainingUniqueValuesCount} more variable responses</p>
      </Div>
    );
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
    fetchPaginatedData: typeof fetchPaginatedData;
}

export const Data = connect(mapStateToProps, mapDispatchToProps)(SimpleData);
