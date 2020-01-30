import React from "react";
import { UserStream } from "~/features/stream";
import ProfilePageLayout from "~/layouts/ProfilePage";
import { getProfileProps } from "./utils";
import "./index.scss";

class ProfilePage extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <ProfilePageLayout user={user}>
                <UserStream userId={user.id} />
            </ProfilePageLayout>
        );
    }
}

ProfilePage.getInitialProps = getProfileProps;

export default ProfilePage;
