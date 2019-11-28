import "./index.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActiveLink from "~/components/ActiveLink";
import OutboundLink from "~/components/OutboundLink";
import React from "react";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    onClickCloseExpand = () => {
        if (this.state.expanded) {
            this.setState({ expanded: !this.state.expanded });
        }
    };

    render() {
        return (
            <nav
                className="navbar navbar-secondary is-white Navigation"
                aria-label="main navigation"
            >
                <div className={"container"}>
                    <div className={"flex v-center flex-gap-big"}>
                        <div className={"flex v-center"}>
                            <strong>Explore</strong>

                            <div
                                className="navbar-burger"
                                onClick={e =>
                                    this.setState({
                                        expanded: !this.state.expanded
                                    })
                                }
                            >
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                        <div
                            className={
                                this.state.expanded
                                    ? "navbar-menu is-active"
                                    : "navbar-menu"
                            }
                        >
                            <div
                                className="navbar-start"
                                onClick={this.onClickCloseExpand}
                            >
                                <ActiveLink
                                    activeClassName="is-active"
                                    route="explore"
                                    params={{ view: "popular" }}
                                >
                                    <a className="navbar-item">
                                        <FontAwesomeIcon icon={"fire"} />
                                        <span>Popular</span>
                                    </a>
                                </ActiveLink>
                                <ActiveLink
                                    activeClassName="is-active"
                                    route="live"
                                >
                                    <a className="navbar-item">
                                        <FontAwesomeIcon icon={"play"} />
                                        <span>Live</span>
                                    </a>
                                </ActiveLink>
                                <ActiveLink
                                    activeClassName="is-active"
                                    route="explore"
                                    params={{ view: "products" }}
                                >
                                    <a className="navbar-item">
                                        <FontAwesomeIcon icon={"ship"} />
                                        <span>Products</span>
                                    </a>
                                </ActiveLink>
                            </div>

                            <div
                                className="navbar-end"
                                onClick={this.onClickCloseExpand}
                            >
                                <OutboundLink
                                    className="navbar-item"
                                    activeClassName="is-active"
                                    href="https://open.getmakerlog.com"
                                    exact
                                >
                                    <FontAwesomeIcon
                                        icon={["far", "chart-bar"]}
                                    />
                                    <span>Open</span>
                                </OutboundLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

Navigation.propTypes = {};

export default Navigation;
