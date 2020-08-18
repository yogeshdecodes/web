import React, { Component } from "react";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";
import Head from "~/components/Head";
import "./index.scss";
import DarkModeToggle from "../../features/gold/DarkModeToggle";
import GoldPageSidebar from "~/components/sidebar/gold-page";

export default class GoldPageLayout extends Component {
    render() {
        return (
            <StdPageLayout
                title="Gold"
                withSidebar
                sidebar={
                    <GoldPageSidebar
                        footer
                        latestUsers={this.props.latestUsers}
                    />
                }
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
                            <a className="navbar-item disabled">
                                Makers <span className="tag">Soon</span>
                            </a>
                        </NavLink>
                        <NavLink route="tasks" activeClassName="is-active">
                            <a className="navbar-item disabled">
                                Ads <span className="tag">Soon</span>
                            </a>
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
                <div className="GoldPage">
                    <Head
                        title={`Gold`}
                        description={
                            "Makerlog Gold is the heart of the maker community."
                        }
                        ogImage={`/img/og/gold-og.png`}
                        ogLargeImage={true}
                    />
                    {this.props.children}
                </div>
            </StdPageLayout>
        );
    }
}
