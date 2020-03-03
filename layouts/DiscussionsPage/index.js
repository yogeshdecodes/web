import React, { Component } from "react";
import PageNavigation from "~/components/ui/PageNavigation";
import DiscussionsSidebar from "~/components/sidebar/discussions";
import NavLink from "~/components/ActiveLink";
import "~/features/discussions/index.scss";
import "./index.scss";

export default class DiscussionsPage extends Component {
    render() {
        return (
            <>
                <PageNavigation title="Discussions">
                    <NavLink
                        route="discussions-top"
                        activeClassName="is-active"
                    >
                        <a className="navbar-item">Top</a>
                    </NavLink>
                    <NavLink route="discussions" activeClassName="is-active">
                        <a className="navbar-item disabled">
                            New <span className="tag">Soon</span>
                        </a>
                    </NavLink>
                    <NavLink route="discussions" activeClassName="is-active">
                        <a className="navbar-item disabled">
                            Rising <span className="tag">Soon</span>
                        </a>
                    </NavLink>
                </PageNavigation>
                <div className={"container grid-c-s"}>
                    <div>{this.props.children}</div>
                    <div className={"is-hidden-mobile"}>
                        <DiscussionsSidebar
                            thread={this.props.thread}
                            replies={this.props.replies}
                        />
                    </div>
                </div>
            </>
        );
    }
}
