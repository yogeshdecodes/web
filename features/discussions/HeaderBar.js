import React from "react";
import { connect } from "react-redux";
import { mapStateToProps as mapUserToProps } from "~/ducks/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";

const NewTopicButton = connect(
    state => ({
        isLoggedIn: state.auth.loggedIn
    }),
    dispatch => ({
        openEditor: () => dispatch(editorActions.openDiscussionEditor(false))
    })
)(props => {
    if (!props.isLoggedIn) {
        return (
            <Link route={"begin"}>
                <a className={"btn-secondary btn-big"}>
                    <FontAwesomeIcon icon={"plus-square"} /> New topic
                </a>
            </Link>
        );
    }
    return (
        <button className={"btn-secondary btn-big"} onClick={props.openEditor}>
            <FontAwesomeIcon icon={"plus-square"} />
            New topic
        </button>
    );
});

export default ({ title, onCreate }) => (
    <div className={"flex col-right v-center mbGap"}>
        <div>
            <h2>{title}</h2>
        </div>
        <NewTopicButton onCreate={onCreate} />
    </div>
);
