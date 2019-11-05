import React from "react";
import {Link as NavLink} from "~/routes";

/*
    <Dropdown className="navbar-item" trigger={() => ()}>
        <>
            <a href="#" className="dropdown-item">
                Dropdown item
            </a>
            <a className="dropdown-item">
                Other dropdown item
            </a>
            <a href="#" className="dropdown-item is-active">
                Active dropdown item
            </a>
            <a href="#" className="dropdown-item">
                Other dropdown item
            </a>
            <hr className="dropdown-divider">
            <a href="#" className="dropdown-item">
                With a divider
            </a>
        </>
    </Dropdown>
 */

class Dropdown extends React.Component {
    state = {
        open: false
    };

    onClick = () => {
        if (this.state.open) {
            document.body.removeEventListener("click", this.onClick, true);
        } else {
            document.body.addEventListener("click", this.onClick, true);
        }
        this.setState({ open: !this.state.open });
    };

    render() {
        const Component = this.props.trigger;

        return (
            <div
                className={this.state.open ? "dropdown is-active" : "dropdown"}
            >
                <div className="dropdown-trigger" onClick={this.onClick}>
                    {this.props.trigger && <Component />}
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content" onClick={this.onClick}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

class NavbarDropdown extends Dropdown {
    render() {
        const Link = this.props.link;
        return (
            <NavLink
                route={this.props.route}
                params={this.props.params}
                onClick={e => {
                    e.preventDefault();
                }}
                activeClassName={"is-located"}
            >
                <a
                    className={
                        "navbar-item has-dropdown " +
                        (this.state.open ? "is-active" : "")
                    }
                >
                    {
                        // eslint-disable-next-line
                    }{" "}
                    <span className="navbar-link" onClick={this.onClick}>
                        <Link />
                    </span>
                    <div className={"navbar-dropdown"}>
                        {this.props.children}
                    </div>
                </a>
            </NavLink>
        );
    }
}

export { Dropdown, NavbarDropdown };
