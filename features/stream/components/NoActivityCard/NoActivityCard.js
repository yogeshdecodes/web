import React from "react";
import {Link} from "~/routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {actions as editorActions} from "../../../../ducks/editor";
import {connect} from "react-redux";

import {GlobalStream} from "~/features/stream";

import styled from "styled-components";
import OutboundLink from "../../../../components/OutboundLink";

const mapDispatchToProps = dispatch => ({
    toggleEditor: () => dispatch(editorActions.toggleEditor())
});

const CtaButton = connect(
    null,
    mapDispatchToProps
)(props => (
    <button onClick={props.toggleEditor} className={"btn CtaButton"}>
        <FontAwesomeIcon icon={"check-circle"} />
        <span>Add your first task</span>
    </button>
));

const NewAccountTweetCard = styled.div`
    background-color: #3498db !important;
    border-color: #3498db !important;
    display: flex;
    align-items: center;
    justify-content: center;

    & .card-content {
        width: 100%;
    }

    & .title,
    & .subtitle {
        color: white;
    }
`;

const WorkflowCard = styled.div`
    background-color: #e6186d !important;
    border-color: #e6186d !important;
    display: flex;
    align-items: center;
    justify-content: center;

    & .card-content {
        width: 100%;
    }

    & .title,
    & .subtitle {
        color: white;
    }
`;

const FirstTaskCard = styled.div`
    background-color: ${props => props.theme.primaryDarker} !important;
    border-color: ${props => props.theme.primaryDarker} !important;
    display: flex;
    align-items: center;
    justify-content: center;

    & .card-content {
        width: 100%;
    }

    & .title,
    & .subtitle {
        color: white;
    }
`;

const renderTweetButton = user => {
    const text = `I just joined @GetMakerlog! 👋 \n #TogetherWeMake`;
    const url = `${process.env.REACT_APP_BASE_URL}/@${user.username}`;

    return (
        <OutboundLink
            href={`https://twitter.com/share?text=${encodeURIComponent(
                text
            )}&url=${url}`}
            className={"btn tweet"}
            target="_blank"
        >
            Tweet
        </OutboundLink>
    );
};

const NoActivityCard = props => (
    <div className={"NoActivityCard"}>
        <section className={"hero has-text-centered"}>
            <FirstTaskCard>
                <div className={"card-content"}>
                    <div className={"flex"}>
                        <div>
                            <FontAwesomeIcon
                                icon={"check-circle"}
                                color={"white"}
                                size={"3x"}
                            />
                        </div>
                        <div>
                            <h3>Post your first task</h3>
                            <strong>
                                Start your productivity journey by posting your
                                first task.
                            </strong>
                            <CtaButton />
                        </div>
                    </div>
                </div>
            </FirstTaskCard>
            <hr />
            <div className={"columns"}>
                <div className={"column"}>
                    <NewAccountTweetCard>
                        <div className={"card-content"}>
                            <div className={"flex"}>
                                <div>
                                    <FontAwesomeIcon
                                        icon={["fab", "twitter"]}
                                        color={"white"}
                                        size={"2x"}
                                    />
                                </div>
                                <div>
                                    <h3>Say hi!</h3>
                                    <strong>
                                        Tweet #TogetherWeMake and say hi to the
                                        community!
                                    </strong>
                                    {renderTweetButton(props.user)}
                                </div>
                            </div>
                        </div>
                    </NewAccountTweetCard>
                </div>
                <div className={"column"}>
                    <WorkflowCard>
                        <div className={"card-content"}>
                            <div className={"flex"}>
                                <div>
                                    <FontAwesomeIcon
                                        icon={"plug"}
                                        color={"white"}
                                        size={"2x"}
                                    />
                                </div>
                                <div>
                                    <h3>Discover apps</h3>
                                    <strong>
                                        Makerlog integrates right with your
                                        workflow. Find an app that makes you
                                        more productive!
                                    </strong>
                                    <Link route={"apps"}>
                                        <a className={"button is-rounded"}>
                                            Discover apps
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </WorkflowCard>
                </div>
            </div>
        </section>
        <GlobalStream />
    </div>
);

export default connect(
    state => ({
        user: state.user.me
    }),
    null
)(NoActivityCard);
