import React, { Component } from "react";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";
import "./index.scss";
import DarkModeToggle from "../../features/gold/DarkModeToggle";
import GoldPageSidebar from "~/components/sidebar/gold-page";

export default class GoldPageLayout extends Component {
    render() {
        return (
            <StdPageLayout
                title="Gold"
                withSidebar
                sidebar={<GoldPageSidebar footer />}
                nav={
                    <>
                        <NavLink route="gold-page" activeClassName="is-active">
                            <a className="navbar-item">Lounge</a>
                        </NavLink>
                        <NavLink
                            route="gold-discussions"
                            activeClassName="is-active"
                            exact
                        >
                            <a className="navbar-item">Discussions</a>
                        </NavLink>
                        <NavLink route="tasks" activeClassName="is-active">
                            <a className="navbar-item">Makers</a>
                        </NavLink>
                        <NavLink route="tasks" activeClassName="is-active">
                            <a className="navbar-item">Ads</a>
                        </NavLink>
                        <NavLink route="settings" activeClassName="is-active">
                            <a className="navbar-item">Settings</a>
                        </NavLink>
                    </>
                }
                navRight={
                    <div className="navbar-item">
                        <DarkModeToggle />
                    </div>
                }
            >
                <div className="GoldPage">{this.props.children}</div>
            </StdPageLayout>
        );
    }
}
