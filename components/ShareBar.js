import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import copy from "clipboard-copy";
import Emoji from "./Emoji";

class CopyLink extends React.Component {
    state = {
        copied: false
    };

    onClick = async () => {
        try {
            await copy(this.props.url);

            this.setState({
                copied: true
            });

            setTimeout(() => {
                this.setState({
                    copied: false
                });
            }, 2000);
        } catch (e) {}
    };

    render() {
        return (
            <span
                onClick={this.onClick}
                className={"gray-link-with-icon " + this.state.copied}
            >
                {!this.state.copied && <>{this.props.children}</>}
                {this.state.copied && (
                    <>
                        <Emoji emoji={"💫"} /> Copied!
                    </>
                )}
            </span>
        );
    }
}

class ShareBar extends React.Component {
    renderShareButtons = () => (
        <div className={"flex flex-gap-big"}>
            {this.props.permalink && (
                <div>
                    <CopyLink url={this.props.permalink}>
                        <FontAwesomeIcon icon={"link"} size={"sm"} />
                        {!this.props.compact && "Permalink"}
                    </CopyLink>
                </div>
            )}
            {this.props.tweetText && (
                <div>
                    <a
                        className={"gray-link-with-icon"}
                        target={"_blank"}
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            this.props.tweetText
                        )}`}
                    >
                        <FontAwesomeIcon
                            icon={["fab", "twitter"]}
                            size={"sm"}
                        />
                        {!this.props.compact && "Tweet"}
                    </a>
                </div>
            )}
        </div>
    );

    render() {
        return (
            <div className={"flex flex-gap-big ShareBar"}>
                {this.props.extraItemsFirst && this.props.extraItemsFirst()}

                {!this.props.rightAlignShare && this.renderShareButtons()}

                {this.props.extraItemsLeft && this.props.extraItemsLeft()}

                {this.props.rightAlignShare && this.renderShareButtons()}
                {this.props.extraItemsRight && this.props.extraItemsRight()}
            </div>
        );
    }
}

ShareBar.propTypes = {};

export default ShareBar;
