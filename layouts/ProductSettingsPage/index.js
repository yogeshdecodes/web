import React, { Component } from "react";
import ProductsPageSidebar from "~/components/sidebar/products-page";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";
import "./index.scss";

export default class ProductSettingsPage extends Component {
    render() {
        const { product } = this.props;
        return (
            <StdPageLayout
                title={product.name}
                nav={
                    <>
                        <NavLink
                            route="product-edit"
                            params={{ slug: product.slug }}
                            activeClassName="is-active"
                        >
                            <a className="navbar-item">General</a>
                        </NavLink>

                        <NavLink
                            route="events-past"
                            activeClassName="is-active"
                        >
                            <a className="navbar-item">Team</a>
                        </NavLink>

                        <NavLink
                            route="events-host"
                            activeClassName="is-active"
                        >
                            <a className="navbar-item">Events</a>
                        </NavLink>
                    </>
                }
                sidebar={<ProductsPageSidebar />}
            >
                {this.props.children}
            </StdPageLayout>
        );
    }
}
