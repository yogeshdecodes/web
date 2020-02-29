import React from "react";
import { getMilestoneBySlug } from "~/lib/milestones";

import "./index.scss";
import MilestoneMedia from "~/features/milestones/components/MilestoneMedia";
import Head from "~/components/Head";
import ProfilePage from "~/layouts/ProfilePage";

class MilestonePage extends React.Component {
    static async getInitialProps({ query }) {
        try {
            return {
                milestone: await getMilestoneBySlug(query.slug),
                layout: {
                    className: "UserPage"
                }
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
            <ProfilePage user={milestone.user}>
                <Head
                    title={`${milestone.title} | Makerlog`}
                    description={`${milestone.title} was achieved on Makerlog, the world's most supportive community of makers shipping together.`}
                    ogImage={milestone.icon || null}
                />

                <div className="card">
                    <div className="card-content">
                        <MilestoneMedia
                            large
                            linked={false}
                            milestone={milestone}
                        />
                    </div>
                </div>
            </ProfilePage>
        );
    }
}

MilestonePage.propTypes = {};

export default MilestonePage;
