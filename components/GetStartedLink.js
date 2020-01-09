import React from "react";
import { actions as authActions } from "~/ducks/auth";
import { connect } from "react-redux";

const GetStartedLink = props => (
    <span className="clickable" onClick={() => props.onToggleAuthModal()}>
        {props.children}
    </span>
);

const mapDispatchToProps = dispatch => {
    return {
        onToggleAuthModal: (type = "begin") => {
            dispatch(authActions.toggleModal(type));
        }
    };
};

export default connect(null, mapDispatchToProps)(GetStartedLink);
