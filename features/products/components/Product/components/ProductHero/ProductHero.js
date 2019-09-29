import React from "react";
import PropTypes from "prop-types";
import Emoji from "~/components/Emoji";
import SocialMediaLevel from "~/components/SocialMediaLevel";
import ProductPeople from "../../../ProductPeople";
import ProductStatsContainer from "~/features/products/containers/ProductStatsContainer";
import Tda from "~/components/Tda";

class ProductHero extends React.Component {
    renderHero = product => (
        <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <div className="ProductHero-Media flex">
                        <div className="ProductHero-Icon">
                            <img
                                className={"img-thumbnail img-64"}
                                src={
                                    product.icon
                                        ? product.icon
                                        : "https://via.placeholder.com/500?text=No+icon"
                                }
                                alt={"product icon"}
                            />
                        </div>
                        <div>
                            <h2>
                                {product.name}{" "}
                                {product.launched && (
                                    <span>
                                        <Emoji emoji={"🚀"} /> Launched
                                    </span>
                                )}
                            </h2>
                            <h3>
                                {product.description
                                    ? product.description
                                    : "The maker didn't describe this product... poor product."}
                            </h3>
                            <SocialMediaLevel
                                website={product.website}
                                twitterUser={product.twitter}
                                productHuntUrl={product.product_hunt}
                            />
                        </div>
                    </div>
                    <div className="flex end ProductHero-Stats">
                        <div className={"hero-item"}>
                            <p>Makers</p>
                            <ProductPeople slug={product.slug} size={48} />
                        </div>
                        <ProductStatsContainer
                            slug={product.slug}
                            component={({ stats }) => (
                                <>
                                    <div className={"hero-item"}>
                                        <p>Done today</p>
                                        {stats.done_today}
                                    </div>
                                    <div className={"hero-item"}>
                                        <p>Tasks/day</p>
                                        <Tda tda={stats.week_tda} />
                                    </div>
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </section>
    );

    render() {
        return this.renderHero(this.props.product);
    }
}

ProductHero.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductHero;
