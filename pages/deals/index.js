import "./index.scss";
import React, { Component } from "react";
import OutboundLink from "../../components/OutboundLink";
import LoggedInOnly from "~/features/users/containers/LoggedInOnly";
import LoggedOutOnly from "~/features/users/containers/LoggedOutOnly";
import { Link } from "~/routes";
import DealMedia from "../../features/deals/DealMedia";
import InfiniteResults from "~/components/InfiniteResults";
import { prefetchDeals } from "../../lib/deals";
import StdPageLayout from "~/layouts/StdPage";
import NavLink from "~/components/ActiveLink";
import PageTitle from "~/components/ui/PageTitle";
import DealsSidebar from "~/components/sidebar/deals-page";

// disable buttons , dont redirect

class DealsPage extends Component {
    static async getInitialProps(ctx) {
        try {
            const prefetchedData = await prefetchDeals();
            return {
                prefetchedData
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: e.status_code ? e.status_code : 500
            };
        }
    }

    render() {
        return (
            <StdPageLayout
                title="Deals"
                sidebar={<DealsSidebar />}
                nav={
                    <>
                        <NavLink route="deals" activeClassName="is-active">
                            <a className="navbar-item">Featured</a>
                        </NavLink>

                        <OutboundLink
                            to="https://airtable.com/shrT9ECO3hxC591Mq"
                            className="navbar-item"
                        >
                            Submit deal
                        </OutboundLink>
                    </>
                }
            >
                <div className="DealsPage">
                    <PageTitle
                        title={<>Latest Deals</>}
                        left={
                            <h4 className="subtitle has-text-grey">
                                Exclusive deals from the community, curated only
                                for Makerlog members.
                            </h4>
                        }
                    />
                    <div className="card">
                        <div className="card-content">
                            <InfiniteResults
                                url={"/deals/"}
                                prefetchedData={this.props.results}
                                component={({ items }) => (
                                    <div className="flex flex-column flex-v-gap">
                                        {items.map(deal => (
                                            <DealMedia deal={deal} />
                                        ))}
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className="has-text-grey">
                        Got an offer for the community?{" "}
                        <a href="https://t.me/matteing">Contact me!</a>
                    </div>
                </div>
            </StdPageLayout>
        );
    }
}

export default DealsPage;
