import React, { Component } from "react";
import PageNavigation from "~/components/ui/PageNavigation";
import NavLink from "~/components/ActiveLink";
import "./index.scss";
import ProductsPageSidebar from "~/components/sidebar/products-page";

export default class ProductsPageLayout extends Component {
    render() {
        return (
            <>
                <PageNavigation title="Products">
                    <NavLink route="products" activeClassName="is-active">
                        <a className="navbar-item">Your products</a>
                    </NavLink>

                    <NavLink
                        route="products-category"
                        activeClassName="is-active"
                    >
                        <a className="navbar-item disabled">
                            Categories <span className="tag">Soon</span>
                        </a>
                    </NavLink>
                </PageNavigation>
                <div className="container mtGap grid-c-s">
                    <div>{this.props.children}</div>
                    <div>
                        <ProductsPageSidebar />
                    </div>
                </div>
            </>
        );
    }
}
