import React from "react";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import AdCard from "~/components/sidebar/components/AdCard";
import "./index.scss";
import OutboundLink from "~/components/OutboundLink";
import { normalizeUrl } from "~/lib/utils/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserRow from "~/features/users/components/UserRow";
import orderBy from "lodash/orderBy";

const ProductPeopleCard = ({ product, people }) => {
    if (!product || !people) return null;

    return (
        <div className="ProductPeopleCard sidebar-item">
            <h3>Makers</h3>
            <div className="card">
                <div className="card-content">
                    <UserRow
                        users={orderBy(people, u => u.id !== product.user)}
                    />
                </div>
            </div>
        </div>
    );
};

const ProductDescriptionCard = ({ product }) => {
    return (
        <div className="ProductDescriptionCard sidebar-item">
            <h3>About {product.name}</h3>
            <div className="card">
                <div className="card-content">
                    <div className="bio">{product.description}</div>
                    <small className="links">
                        <ul>
                            {product.website && (
                                <li>
                                    {" "}
                                    <OutboundLink
                                        to={normalizeUrl(product.website)}
                                    >
                                        <FontAwesomeIcon icon="globe" />{" "}
                                        {normalizeUrl(product.website)
                                            .replace("http://", "")
                                            .replace("https://", "")}
                                    </OutboundLink>
                                </li>
                            )}
                            {product.twitter && (
                                <li>
                                    <OutboundLink
                                        to={`https://twitter.com/${product.twitter}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fab", "twitter"]}
                                        />{" "}
                                        {product.twitter}
                                    </OutboundLink>
                                </li>
                            )}
                        </ul>
                    </small>
                </div>
            </div>
        </div>
    );
};

const ProductSidebar = ({ product, people = null }) => {
    //if (!data || data.failed) return null;
    if (!product) return null;

    return (
        <div className="ProductSidebar Sidebar">
            <ProductDescriptionCard product={product} people={people} />
            <ProductPeopleCard product={product} people={people} />

            <AdCard />
            <SmallFooter />
        </div>
    );
};

export async function prefetchData() {
    try {
        return {};
    } catch (e) {
        return {
            data: {
                failed: true
            }
        };
    }
}

export default ProductSidebar;
