import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/src/components/FontAwesomeIcon";
import { connect } from "react-redux";
import { actions as appActions } from "ducks/app";

const FeedbackTabStyle = styled.button`
    background-color: ${props => props.theme.primaryDarker};
    position: fixed;
    bottom: 20px;
    right: 20px;
    color: white;
    border-radius: 50%;
    text-align: center;
    display: flex;
    width: 50px;
    height: 50px;
    text-align: center;
    justify-content: center;
    font-size: 18px;
    border: 0;
    outline: none;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 0px 106px -26px rgba(0, 0, 0, 0.75);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
    transition: all 0.3s ease-out;

    &:active {
        transform: scale(0.5);
    }
`;

const FeedbackTab = props => (
    <FeedbackTabStyle onClick={props.toggleFeedback}>
        <FontAwesomeIcon icon={"bullhorn"} />
    </FeedbackTabStyle>
);

const mapDispatchToProps = dispatch => {
    return {
        toggleFeedback: () => dispatch(appActions.toggleFeedback())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(FeedbackTab);
