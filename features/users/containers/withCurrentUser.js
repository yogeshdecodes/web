import React from "react";
import { connect } from "react-redux";

const withCurrentUser = WrappedComponent => {
    class HOC extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return connect(mapStateToProps)(HOC);
};

const mapStateToProps = state => ({
    me: state.user.me,
    user: state.user.me,
    isLoggedIn: state.auth.loggedIn
});

export default withCurrentUser;
