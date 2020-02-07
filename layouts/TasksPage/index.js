import React, { Component } from "react";
import GoldIcon from "~/components/icons/GoldIcon";
import PageNavigation from "~/components/ui/PageNavigation";
import NavLink from "~/components/ActiveLink";
import "./index.scss";
import SearchBar from "../../features/tasks/components/SearchBar";

export default class TasksPageLayout extends Component {
    render() {
        return (
            <>
                <PageNavigation
                    title="Tasks"
                    end={
                        <div className="navbar-item">
                            <SearchBar />
                        </div>
                    }
                >
                    <NavLink route="tasks" activeClassName="is-active">
                        <a className="navbar-item">Today</a>
                    </NavLink>

                    <NavLink route="tasks-list" activeClassName="is-active">
                        <a className="navbar-item">List</a>
                    </NavLink>

                    <NavLink route="tasks-kanban" activeClassName="is-active">
                        <a className="navbar-item">
                            Kanban{" "}
                            <span className="tag">
                                <GoldIcon />
                            </span>
                        </a>
                    </NavLink>
                </PageNavigation>
                {this.props.children}
            </>
        );
    }
}
