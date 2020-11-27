import React from "react";
import ProfilePageLayout from "~/layouts/ProfilePage";
import { getByUsername } from "~/lib/user";
import "./index.scss";
import KeyActivityFeed from "../../features/feeds/KeyActivityFeed";

export async function getProfileProps({ query: { username } }) {
    const layout = { className: "UserPage" };

    try {
        const user = await getByUsername(username);
        return { user, layout: { ...layout } };
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
        const { user } = this.props;

        return (
            <ProfilePageLayout user={user}>
                <KeyActivityFeed key={user.id} userId={user.id} feed="user" />
            </ProfilePageLayout>
        );
    }
}

ProfilePage.getInitialProps = getProfileProps;

export default ProfilePage;
