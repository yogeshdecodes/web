import "./index.scss";
import Markdown from "~/components/Markdown";
import OutboundLink from "~/components/OutboundLink";
import React from "react";
import EventsPageLayout from "../../layouts/EventsPage";
import { getEvent } from "../../lib/events";
import Head from "~/components/Head";

class EventPage extends React.Component {
    static async getInitialProps({ query }) {
        const layout = { className: "EventsPage" };

        try {
            const item = await getEvent(query.slug);
            return { item, layout };
        } catch (e) {
            if (e.status_code && e.status_code === 404) {
                return { statusCode: 404 };
            } else {
                return { statusCode: 500 };
            }
        }
    }

    render() {
        const { item } = this.props;

        return (
            <EventsPageLayout event={item}>
                <Head
                    title={item.title}
                    description={item.description}
                    ogImage={item.icon || null}
                />
                <div className={"flex col-right v-center mbGap"}>
                    <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                    <div>
                        <OutboundLink
                            className="btn btn-secondary"
                            to={item.website}
                        >
                            View website
                        </OutboundLink>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content">
                        <Markdown body={item.details} />
                    </div>
                </div>
            </EventsPageLayout>
        );
    }
}

export default EventPage;
