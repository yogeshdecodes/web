import React from "react";
import TopUsersContainer from "./TopUsersContainer";

const withTopUsers = WrappedComponent => {
    class HOC extends React.Component {
        render() {
            return <TopUsersContainer component={WrappedComponent} />;
        }
    }
};

export default withTopUsers;
