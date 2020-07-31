import React, { Component } from "react";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";
import "./index.scss";

export default class GoldPageLayout extends Component {
    render() {
        return (
            <StdPageLayout
                title="Gold"
                nav={
                    <>
                        <NavLink route="gold-page" activeClassName="is-active">
                            <a className="navbar-item">Lounge</a>
                        </NavLink>
                        <NavLink route="tasks" activeClassName="is-active">
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
            >
                {this.props.children}
            </StdPageLayout>
        );
    }
}
