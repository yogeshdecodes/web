import React from "react";
import Head from "~/components/Head";
import PageNavigation from "~/components/ui/PageNavigation";
import ProductSidebar from "~/components/sidebar/product-page";
import "./index.scss";
import { connect } from "react-redux";
import NavLink from "~/components/ActiveLink";
import { Link } from "~/routes";
import "../ProfilePage/index.scss";
import ProductIcon from "../../features/products/components/ProductIcon";
import { isTeamMember } from "~/lib/utils/products";

function getCoverStyle(product, isBackdrop = false) {
    if (product.accent)
        return {
            background: product.accent,
            backgroundPosition: "center",
            backgroundSize: isBackdrop ? "cover" : "contain",
            backgroundRepeat: "no-repeat"
        };

    return {};
}

const mapStateToProps = state => ({
    me: state.user.me ? state.user.me : {}
});

export default connect(mapStateToProps)(
    ({ product, people, me = {}, ...props }) => {
        return (
            <>
                <Head
                    title={`${product.name}`}
                    description={`${product.name} is shipped on Makerlog, the home of the maker community.`}
                    ogImage={product.icon || null}
                />
                <section
                    style={getCoverStyle(product, true)}
                    className="header-section"
                >
                    <div
                        style={getCoverStyle(product)}
                        className="container"
                    ></div>
                    <PageNavigation
                        title={
                            <div className="profile-picture">
                                <ProductIcon product={product} />
                            </div>
                        }
                        end={
                            me.id === product.user ||
                            isTeamMember(product, me) ? (
                                <div className="navbar-item">
                                    <Link
                                        route="product-edit"
                                        params={{ slug: product.slug }}
                                    >
                                        <a className="btn btn-light">Edit</a>
                                    </Link>
                                </div>
                            ) : null
                        }
                    >
                        <h2>{product.name}</h2>
                        <NavLink
                            activeClassName="is-active"
                            route="product-page"
                            params={{ slug: product.slug }}
                        >
                            <a className={"navbar-item"}>Activity</a>
                        </NavLink>
                        <NavLink
                            activeClassName="is-active"
                            route="product-page-updates"
                            params={{ slug: product.slug }}
                        >
                            <a className={"navbar-item disabled"}>
                                Updates <span className="tag">Soon</span>
                            </a>
                        </NavLink>
                        <NavLink
                            activeClassName="is-active"
                            route="product-page-discussions"
                            params={{ slug: product.slug }}
                        >
                            <a className={"navbar-item disabled"}>
                                Discussions <span className="tag">Soon</span>
                            </a>
                        </NavLink>
                    </PageNavigation>
                </section>

                <div className="container">
                    <div className="grid-c-s">
                        <div>{props.children}</div>
                        <div>
                            <ProductSidebar people={people} product={product} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
);
