import * as React from "react";
import {Dropdown} from "../Dropdown/Dropdown";
import { Link, LinkWrapper, Nav } from "./styles";

class NavBar extends React.Component {
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
