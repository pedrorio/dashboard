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
  activeIndex: number;
  isOpen: boolean;
}

let nextListId = 0;

class SimpleDropdown extends React.Component<IDropdownProps, IDropdownState> {
  public state = {
    activeIndex: 0,
    isOpen: false,
  } as IDropdownState;

  private hoverTimer: number | null = null;
  private listId = `census-variable-listbox-${nextListId++}`;
  private listening = false;
  private optionRefs: Array<HTMLAnchorElement | null> = [];
  private rootRef: HTMLDivElement | null = null;
  private triggerRef: HTMLButtonElement | null = null;

  public componentDidMount() {
    this.props.fetchVariableNames();
  }

  public componentDidUpdate() {
    this.setDocumentListener(this.state.isOpen);
  }

  public componentWillUnmount() {
    this.clearHoverTimer();
    this.setDocumentListener(false);
  }

  public render() {
    return (
      <Div
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        ref={this.setRootRef}
      >
        <Button
          aria-controls={this.listId}
          aria-expanded={this.state.isOpen}
          aria-haspopup="listbox"
          id={`${this.listId}-trigger`}
          onClick={this.toggle}
          onKeyDown={this.onTriggerKeyDown}
          ref={this.setTriggerRef}
          type="button"
        >
          Data Variable
        </Button>
        {this.renderList()}
      </Div>
    );
  }

  private renderList() {
    if (!this.state.isOpen) {
      return null;
    }
    const names = this.props.censusVariableNames || [];
    return (
      <Wrapper
        aria-label="Census variables"
        id={this.listId}
        role="listbox"
      >
        {names.map((variable, index) => this.renderOption(variable, index))}
      </Wrapper>
    );
  }

  private renderOption(variable: string, index: number) {
    return (
      <LinkWrapper key={variable}>
        <Link
          aria-selected={index === this.state.activeIndex}
          id={`${this.listId}-option-${index}`}
          innerRef={this.setOptionRef(index)}
          onClick={this.onSelect(variable)}
          onKeyDown={this.onOptionKeyDown(index)}
          role="option"
          to={`/explorer/${variable}`}
        >
          {variable}
        </Link>
      </LinkWrapper>
    );
  }

  private setRootRef = (node: HTMLDivElement | null) => {
    this.rootRef = node;
  }

  private setTriggerRef = (node: HTMLButtonElement | null) => {
    this.triggerRef = node;
  }

  private setOptionRef = (index: number) => (node: HTMLAnchorElement | null) => {
    this.optionRefs[index] = node;
  }

  private toggle = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  }

  private close = (focusTrigger: boolean) => {
    this.setState({ isOpen: false }, () => {
      if (focusTrigger && this.triggerRef) {
        this.triggerRef.focus();
      }
    });
  }

  private moveTo = (index: number) => {
    const count = (this.props.censusVariableNames || []).length;
    if (count === 0) {
      return;
    }
    const next = (index + count) % count;
    this.setState({ activeIndex: next, isOpen: true }, () => {
      const node = this.optionRefs[next];
      if (node) {
        node.focus();
      }
    });
  }

  private onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggle();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.moveTo(0);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.moveTo((this.props.censusVariableNames || []).length - 1);
      return;
    }
    if (event.key === "Escape" && this.state.isOpen) {
      event.preventDefault();
      this.close(true);
    }
  }

  private onOptionKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.moveTo(index + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.moveTo(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      this.moveTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      this.moveTo((this.props.censusVariableNames || []).length - 1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      this.close(true);
    }
  }

  private onSelect = (variable: string) => () => {
    this.props.selectActiveVariable(variable);
    this.setState({ isOpen: false });
  }

  private onMouseOver = () => {
    this.clearHoverTimer();
    this.hoverTimer = window.setTimeout(() => {
      this.setState({ isOpen: true });
    }, 300);
  }

  private onMouseOut = () => {
    this.clearHoverTimer();
    this.hoverTimer = window.setTimeout(() => {
      this.setState({ isOpen: false });
    }, 100);
  }

  private clearHoverTimer() {
    if (this.hoverTimer !== null) {
      window.clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
  }

  private onDocumentMouseDown = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (this.rootRef && target && !this.rootRef.contains(target)) {
      this.setState({ isOpen: false });
    }
  }

  private setDocumentListener(open: boolean) {
    if (open && !this.listening) {
      document.addEventListener("mousedown", this.onDocumentMouseDown);
      this.listening = true;
    } else if (!open && this.listening) {
      document.removeEventListener("mousedown", this.onDocumentMouseDown);
      this.listening = false;
    }
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

export const Dropdown = connect(mapStateToProps, mapDispatchToProps)(SimpleDropdown);
