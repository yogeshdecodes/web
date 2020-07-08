import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "~/routes";
import { actions as editorActions } from "~/ducks/editor";

const NewTopicButton = connect(
    state => ({
        isLoggedIn: state.auth.loggedIn
    }),
    dispatch => ({
        openEditor: () => dispatch(editorActions.toggleEditor(2))
    })
)(props => {
    if (!props.isLoggedIn) {
        return (
            <Link route={"start"}>
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
