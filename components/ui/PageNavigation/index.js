import "./index.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActiveLink from "~/components/ActiveLink";
import OutboundLink from "~/components/OutboundLink";
import React from "react";

class PageNavigation extends React.Component {
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
                className="navbar navbar-secondary"
                aria-label="secondary navigation"
            >
                <div className={"container"}>
                    <div className={"flex v-center flex-gap-big"}>
                        <div className={"flex v-center"}>
                            <strong>{this.props.title}</strong>

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
                                {this.props.children}
                            </div>

                            <div
                                className="navbar-end"
                                onClick={this.onClickCloseExpand}
                            >
                                {this.props.end ? this.props.end : null}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

PageNavigation.propTypes = {};

export default PageNavigation;
