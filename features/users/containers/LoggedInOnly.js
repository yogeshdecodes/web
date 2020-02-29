import { connect } from "react-redux";

const LoggedInOnly = ({ isLoggedIn, children }) => {
    if (isLoggedIn) {
        return children;
    } else {
        // todo: login to do follow cta?
        return null;
    }
};

const mapStateToProps = state => ({
    isLoggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(LoggedInOnly);
