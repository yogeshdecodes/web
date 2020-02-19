import React, { Component } from "react";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";
import EventPageSidebar from "~/components/sidebar/event-page";
import "./index.scss";

export default class EventsPageLayout extends Component {
    render() {
        return (
            <StdPageLayout
                title="Events"
                nav={
                    <>
                        <NavLink route="events" activeClassName="is-active">
                            <a className="navbar-item">Soon</a>
                        </NavLink>

                        <NavLink
                            route="events-past"
                            activeClassName="is-active"
                        >
                            <a className="navbar-item">Past</a>
                        </NavLink>

                        <NavLink
                            route="events-host"
                            activeClassName="is-active"
                        >
                            <a className="navbar-item">Host event</a>
                        </NavLink>
                    </>
                }
                sidebar={
                    this.props.event ? (
                        <EventPageSidebar event={this.props.event} />
                    ) : null
                }
            >
                {this.props.children}
            </StdPageLayout>
        );
    }
}
