import React from "react";
import Modal from "~/components/Modal";
import {StreamCard} from "../features/stream/components/Stream/components/StreamCard/styled";
import Emoji from "./Emoji";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/src/components/FontAwesomeIcon";

class FeedbackModal extends React.Component {
    render() {
        const { open, toggle } = this.props;

        return (
            <Modal
                open={open}
                background={"transparent"}
                flexDirection={"column"}
                modalStyles={{
                    overflowY: "hidden"
                }}
                percentWidth={"50"}
                onClose={toggle}
            >
                <StreamCard>
                    <div className={"hero"}>
                        <h1>Help & Feedback</h1>
                    </div>
                    <StreamCard.Content>
                        <div style={{ margin: "0 auto", padding: 30 }}>
                            <div className={"columns"}>
                                <div className={"column"}>
                                    <h4>
                                        <Emoji emoji={"⚡️"} /> Get help
                                    </h4>
                                    <p
                                        className={"has-text-grey"}
                                        style={{ marginBottom: 20 }}
                                    >
                                        Having trouble? I'll help you out!
                                    </p>
                                    <div>
                                        <div className="field  has-addons">
                                            <p className="control">
                                                <a
                                                    href={
                                                        "https://twitter.com/messages/compose?recipient_id=727184556499988480"
                                                    }
                                                    className="button is-fullwidth is-rounded"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fab",
                                                            "twitter"
                                                        ]}
                                                    />{" "}
                                                    Twitter DM
                                                </a>
                                            </p>
                                            <p className="control">
                                                <a
                                                    href="https://t.me/matteing"
                                                    className="button is-rounded"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fab",
                                                            "telegram"
                                                        ]}
                                                    />{" "}
                                                    Telegram
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={"column"}>
                                    <h4 style={{ marginBottom: 3 }}>
                                        <Emoji emoji={"🐞️"} /> Report a bug
                                    </h4>
                                    <p
                                        className={"has-text-grey"}
                                        style={{ marginBottom: 20 }}
                                    >
                                        I'll fix it right up!
                                    </p>
                                    <div>
                                        <a
                                            href={
                                                "https://twitter.com/messages/compose?recipient_id=727184556499988480"
                                            }
                                            className="button is-fullwidth is-rounded"
                                        >
                                            <FontAwesomeIcon icon={"bug"} />{" "}
                                            Report a bug
                                        </a>
                                    </div>
                                </div>
                                <div className={"column"}>
                                    <h4 style={{ marginBottom: 3 }}>
                                        <Emoji emoji={"✨"} /> Submit an idea
                                    </h4>
                                    <p
                                        className={"has-text-grey"}
                                        style={{ marginBottom: 20 }}
                                    >
                                        I'm always open to new ideas!
                                    </p>
                                    <div>
                                        <a
                                            href={
                                                "https://twitter.com/messages/compose?recipient_id=727184556499988480"
                                            }
                                            className="button is-fullwidth is-rounded"
                                        >
                                            <FontAwesomeIcon
                                                icon={"bullhorn"}
                                            />{" "}
                                            Request a feature
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </StreamCard.Content>
                </StreamCard>
            </Modal>
        );
    }
}

export default FeedbackModal;
