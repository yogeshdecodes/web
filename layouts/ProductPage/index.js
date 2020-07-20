import React from "react";
import Head from "~/components/Head";
import PageNavigation from "~/components/ui/PageNavigation";
import ProductSidebar from "~/components/sidebar/product-page";
import "./index.scss";
import { connect } from "react-redux";
import NavLink from "~/components/ActiveLink";
import { Link } from "~/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../ProfilePage/index.scss";
import ProductIcon from "../../features/products/components/ProductIcon";
import { isTeamMember, normalizeUrl } from "~/lib/utils/products";
import OutboundLink from "~/components/OutboundLink";

function getAccentStyle(product, isBackdrop = false) {
    if (product.accent)
        return {
            background: `${product.accent}`
        };

    return { background: "#00a676" };
}

function getContrastYIQ(hexcolor, title = false) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "var(--c-title)" : "var(--c-lightest)";
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
                <div
                    className="hero-media"
                    style={{
                        ...getAccentStyle(product),
                        color: getContrastYIQ(
                            getAccentStyle(product).background
                        )
                    }}
                >
                    <div className="container">
                        <div className="flex flex-gap">
                            <div>
                                <ProductIcon is={64} product={product} />
                            </div>
                            <div className="flex flex-column flex-v-gap">
                                <div>
                                    <h2 style={{ color: "inherit" }}>
                                        {product.name}
                                    </h2>
                                    <p>{product.description}</p>
                                </div>
                                <div>
                                    <div className="flex links-flex flex-gap">
                                        {product.website && (
                                            <div>
                                                {" "}
                                                <OutboundLink
                                                    className="btn btn-link btn-small"
                                                    to={normalizeUrl(
                                                        product.website
                                                    )}
                                                >
                                                    <FontAwesomeIcon icon="globe" />{" "}
                                                    {normalizeUrl(
                                                        product.website
                                                    )
                                                        .replace("http://", "")
                                                        .replace(
                                                            "https://",
                                                            ""
                                                        )}
                                                </OutboundLink>
                                            </div>
                                        )}
                                        {product.twitter && (
                                            <div>
                                                <OutboundLink
                                                    className="btn btn-link btn-small"
                                                    to={`https://twitter.com/${product.twitter}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fab",
                                                            "twitter"
                                                        ]}
                                                    />{" "}
                                                    <span className="is-hidden-mobile">
                                                        {product.twitter}
                                                    </span>
                                                </OutboundLink>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <PageNavigation
                    end={
                        me.id === product.user || isTeamMember(product, me) ? (
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

                <div className="container ">
                    <div className="mtGap grid-c-s">
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
