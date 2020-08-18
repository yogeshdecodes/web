import React, { Component } from "react";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";

export default class AdsPageLayout extends Component {
    render() {
        return (
            <StdPageLayout
                title="Ads"
                nav={
                    <>
                        <NavLink route="ads" activeClassName="is-active">
                            <a className="navbar-item">Book</a>
                        </NavLink>
                    </>
                }
                withSidebar
                sidebar={this.props.sidebar ? this.props.sidebar : null}
                fullWidth={this.props.fullWidth ? this.props.fullWidth : null}
            >
                {this.props.children}
            </StdPageLayout>
        );
    }
}
