import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

export default class InlineCollapse extends Component {
    state = {
        open: false
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        return (
            <div className="InlineCollapse">
                <div className="collapse-control">
                    <a
                        className={
                            this.props.className
                                ? this.props.className
                                : "has-text-grey-light"
                        }
                        onClick={this.toggle}
                    >
                        {this.props.text} &nbsp;
                        {this.state.open ? (
                            <FontAwesomeIcon icon="caret-up" />
                        ) : (
                            <FontAwesomeIcon icon="caret-down" />
                        )}
                    </a>
                </div>
                {this.state.open && (
                    <div className="collapse-content">
                        {this.props.children}
                    </div>
                )}
            </div>
        );
    }
}
