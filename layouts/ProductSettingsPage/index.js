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
                        <a
                            className={
                                "navbar-item " +
                                (this.props.tab === 0 && "is-active")
                            }
                            onClick={e => this.props.switchTab(0)}
                        >
                            General
                        </a>
                        <a
                            className={
                                "navbar-item " +
                                (this.props.tab === 1 && "is-active")
                            }
                            onClick={e => this.props.switchTab(1)}
                        >
                            Team
                        </a>
                        <a
                            className={
                                "navbar-item " +
                                (this.props.tab === 2 && "is-active")
                            }
                            onClick={e => this.props.switchTab(2)}
                        >
                            Events
                        </a>
                    </>
                }
                sidebar={<ProductsPageSidebar />}
            >
                {this.props.children}
            </StdPageLayout>
        );
    }
}
