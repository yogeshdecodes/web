import React, { Component } from "react";
import ProfilePageLayout from "~/layouts/ProfilePage";
import { getProfileProps } from "../utils";

class UpdatesTab extends Component {
    render() {
        const { user } = this.props;
        return (
            <ProfilePageLayout user={user}>
                Not created...yet!
            </ProfilePageLayout>
        );
    }
}

UpdatesTab.getInitialProps = getProfileProps;

export default UpdatesTab;
