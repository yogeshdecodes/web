import AllProductsTab from "../../features/discovery/components/AllProductsTab";
import Navigation from "../../features/discovery/components/Navigation";
import PopularTab from "../../features/discovery/components/PopularTab";
import React from "react";
import { getWorldStats } from "~/lib/stats";
import "./index.scss";

class ExplorePage extends React.Component {
    static async getInitialProps({ query, ...ctx }) {
        try {
            return {
                worldStats: await getWorldStats(),
                view: query.view ? query.view : null
            };
        } catch (e) {
            return {
                statusCode: 500
            };
        }
    }

    renderExploreRoute = () => {
        const { view, worldStats } = this.props;

        switch (view) {
            case "products":
                return <AllProductsTab worldStats={worldStats} />;

            default:
                return <PopularTab worldStats={worldStats} />;
        }
    };

    render() {
        return (
            <div className={"ExplorePage"}>
                <Navigation />
                {this.renderExploreRoute()}
            </div>
        );
    }
}

ExplorePage.propTypes = {};

export default ExplorePage;
