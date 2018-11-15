import * as React from "react";
import {Dropdown} from "../Dropdown/Dropdown";
import { Link, LinkWrapper, Nav } from "./styles";

interface INavBarProps {
}

interface INavBarState {
}

class NavBar extends React.Component<INavBarProps, INavBarState> {
    public render() {
        return (
            <Nav>
              <LinkWrapper>
                <Link to={"/"}>Census</Link>
              </LinkWrapper>
              <Dropdown/>
            </Nav>
        );
    }
}

export default NavBar;
