import React from "react";
import { Link } from "~/routes";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { actions as editorActions } from "~/ducks/editor";

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
                className="navbar navbar-secondary Navigation"
                aria-label="main navigation"
            >
                <div className={"container"}>
                    <div className="navbar-brand is-hidden-desktop">
                        <strong className="navbar-item">Tasks</strong>

                        <div
                            className="navbar-burger"
                            onClick={e =>
                                this.setState({
                                    expanded: !this.state.expanded
                                })
                            }
                        >
                            <span></span>
                            <span></span>
                            <span></span>
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
                            <Link route="tasks">
                                <a className="navbar-item">
                                    <FontAwesomeIcon icon={"check"} />
                                    <span>Today</span>
                                </a>
                            </Link>
                            <Link route="tasks" params={{ view: "list" }}>
                                <a className="navbar-item">
                                    <FontAwesomeIcon icon={"tasks"} />
                                    <span>List</span>
                                </a>
                            </Link>
                            <Link route="tasks" params={{ view: "kanban" }}>
                                <a className="navbar-item">
                                    <FontAwesomeIcon icon={"columns"} />
                                    <span>Kanban</span>
                                </a>
                            </Link>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <button
                                    className={"btn"}
                                    onClick={this.props.toggleEditor}
                                >
                                    <FontAwesomeIcon icon={"plus"} /> Add task
                                </button>
                            </div>
                            <div className="navbar-item">
                                <SearchBar />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggleEditor: () => dispatch(editorActions.toggleEditor())
});

Navigation.propTypes = {};

export default connect(
    null,
    mapDispatchToProps
)(Navigation);
