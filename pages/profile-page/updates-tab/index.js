import React, { Component } from "react";
import ProfilePageLayout from "~/layouts/ProfilePage";
import { getProfileProps } from "../index";
import Emoji from "~/components/Emoji";

class UpdatesTab extends Component {
    render() {
        const { user } = this.props;
        return (
            <ProfilePageLayout user={user}>
                <Emoji emoji="🚧" /> Not created...yet!
            </ProfilePageLayout>
        );
    }
}

UpdatesTab.getInitialProps = getProfileProps;

export default UpdatesTab;
