import React from "react";
import { UserStream } from "~/features/stream";
import ProfilePageLayout from "~/layouts/ProfilePage";
import { getByUsername } from "~/lib/user";
import { getUserTrophies } from "~/lib/achievements";
import "./index.scss";
import KeyActivityFeed from "../../features/feeds/KeyActivityFeed";

export async function getProfileProps({ query: { username } }) {
    const layout = { className: "UserPage" };

    try {
        const user = await getByUsername(username);
        const achievements = await getUserTrophies(username);
        return { user, achievements, layout: { ...layout } };
    } catch (e) {
        if (e.status_code && e.status_code === 404) {
            return { statusCode: 404 };
        } else {
            return { statusCode: 500 };
        }
    }
}

class ProfilePage extends React.Component {
    render() {
        const { user, achievements } = this.props;

        return (
            <ProfilePageLayout user={user} achievements={achievements}>
                <UserStream userId={user.id} />
            </ProfilePageLayout>
        );
    }
}

ProfilePage.getInitialProps = getProfileProps;

export default ProfilePage;
