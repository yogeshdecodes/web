import React from "react";
import { getMilestoneBySlug } from "~/lib/milestones";

import "./index.scss";
import MilestoneMedia from "~/features/milestones/components/MilestoneMedia";
import { CommentsBox } from "~/features/comments";
import Sticky from "react-stickynode";
import UserCard from "~/features/users/UserCard";
import { isServer } from "~/config";
import Head from "~/components/Head";

class MilestonePage extends React.Component {
    static async getInitialProps({ query }) {
        try {
            return {
                milestone: await getMilestoneBySlug(query.slug)
            };
        } catch (e) {
            if (e.status_code && e.status_code === 404) {
                return {
                    statusCode: 404
                };
            } else {
                return {
                    statusCode: 500
                };
            }
        }
    }

    render() {
        const { milestone } = this.props;

        return (
            <div className="MilestonePage">
                <Head
                    title={`${milestone.title} | Makerlog`}
                    description={`${milestone.title} was achieved on Makerlog, the world's most supportive community of makers shipping together.`}
                    ogImage={milestone.icon || null}
                />

                <div className={"columns"}>
                    <div className={"column is-one-quarter"}>
                        <Sticky
                            enabled={
                                !isServer ? window.innerWidth >= 728 : true
                            }
                            top={30}
                        >
                            <UserCard user={milestone.user} />
                        </Sticky>
                    </div>
                    <div className={"column"}>
                        <div className="card">
                            <div className={"card-content"}>
                                <MilestoneMedia
                                    large
                                    linked={false}
                                    milestone={milestone}
                                />
                            </div>
                        </div>
                        <br />
                        <CommentsBox
                            indexUrl={`/milestones/${milestone.slug}/`}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

MilestonePage.propTypes = {};

export default MilestonePage;
