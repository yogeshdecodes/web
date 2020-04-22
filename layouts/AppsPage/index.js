import React, { Component } from "react";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";
import Spinner from "~/components/Spinner";

export default class AppsPageLayout extends Component {
    render() {
        return (
            <StdPageLayout
                title="Integrations"
                nav={
                    <>
                        <NavLink route="apps" activeClassName="is-active">
                            <a className="navbar-item">Featured</a>
                        </NavLink>

                        <NavLink activeClassName="is-active">
                            <a className="navbar-item disabled">
                                Community <p className="tag">Soon</p>
                            </a>
                        </NavLink>
                    </>
                }
            >
                {this.props.ready ? (
                    this.props.children
                ) : (
                    <Spinner text="Loading your apps..." />
                )}
            </StdPageLayout>
        );
    }
}
