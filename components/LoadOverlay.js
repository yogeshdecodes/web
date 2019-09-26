import React from "react";
import Spinner from "./Spinner";
import styled from "styled-components";

let Loader = styled.div`
    position: ${props => (props.coverParent ? "absolute" : "fixed")};
`;

let MutedText = styled.div`
    color: ${props => (props.errored ? "red" : props.theme.primaryDarker)};
`;

function getErrMessage(code) {
    return code
        ? `Uh oh, something went wrong. (${code})`
        : "Uh oh, something went wrong.";
}

export default ({ errored = false, code = false }) => (
    <Loader className={"main-loading"}>
        <div>{errored ? null : <Spinner color="white" />}</div>
        <MutedText errored={errored}>
            <strong>
                {errored ? getErrMessage() : "Go change the world."}
            </strong>
        </MutedText>
    </Loader>
);
