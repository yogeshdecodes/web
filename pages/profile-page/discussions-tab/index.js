import React, { Component } from "react";
import ProfilePageLayout from "~/layouts/ProfilePage";
import { getProfileProps } from "../index";
import { getProducts } from "~/lib/products";
import { ProductList } from "~/features/products";
import { prefetchDiscussionsForUser } from "../../../lib/discussions";
import ThreadStreamItem from "../../../features/discussions/ThreadStream/Item";
import InfiniteResults from "~/components/InfiniteResults";
import "~/features/discussions/index.scss";

class DiscussionsTab extends Component {
    render() {
        const { user, threads } = this.props;

        if (!threads.results.length) {
            return (
                <ProfilePageLayout user={user}>
                    This user has created no threads. Oof.
                </ProfilePageLayout>
            );
        }

        console.log(threads);

        return (
            <ProfilePageLayout user={user}>
                <div className="DiscussionsPage">
                    <InfiniteResults
                        url={`/discussions/?owner=${user.id}`}
                        withSockets
                        prefetchedData={threads}
                        socketTypePrefix={"thread"}
                        component={({ items }) => (
                            <div className={"card"}>
                                <div className="card-content">
                                    {items.map(t => (
                                        <ThreadStreamItem
                                            thread={t}
                                            key={t.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    />
                </div>
            </ProfilePageLayout>
        );
    }
}

DiscussionsTab.getInitialProps = async e => {
    const props = await getProfileProps(e);

    let threads = null;
    if (props.user) {
        try {
            threads = await prefetchDiscussionsForUser(props.user.id);
        } catch (e) {
            console.log(e);
        }
    }

    return { threads, ...props };
};

export default DiscussionsTab;
