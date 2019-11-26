import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FollowButton from "~/features/users/components/FollowButton";
import { getHostname, normalizeUrl } from "../lib/utils/products";

class SocialMediaLevel extends React.Component {
    render() {
        return (
            <nav className="flex v-center flex-gap SocialMediaLevel">
                {this.props.user && (
                    <FollowButton userId={this.props.user.id} />
                )}
                {this.props.website && (
                    <div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={normalizeUrl(this.props.website)}
                        >
                            <button className={"is-rounded"}>
                                <FontAwesomeIcon icon={"globe"} />
                                <strong>
                                    {getHostname(this.props.website)}
                                </strong>
                            </button>
                        </a>
                    </div>
                )}
                {this.props.twitterUser && (
                    <div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://twitter.com/${this.props.twitterUser}`}
                        >
                            <FontAwesomeIcon icon={["fab", "twitter"]} />
                        </a>
                    </div>
                )}
                {this.props.telegramUser && (
                    <div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://t.me/${this.props.telegramUser}`}
                        >
                            <FontAwesomeIcon icon={["fab", "telegram"]} />
                        </a>
                    </div>
                )}
                {this.props.twitterUrl && (
                    <div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={this.props.twitterUrl}
                        >
                            <FontAwesomeIcon icon={["fab", "twitter"]} />
                        </a>
                    </div>
                )}
                {this.props.productHuntUser && (
                    <div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://producthunt.com/@${this.props.productHuntUser}`}
                        >
                            <FontAwesomeIcon icon={["fab", "product-hunt"]} />
                        </a>
                    </div>
                )}
                {this.props.productHuntUrl && (
                    <div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={normalizeUrl(this.props.productHuntUrl)}
                        >
                            <FontAwesomeIcon icon={["fab", "product-hunt"]} />
                        </a>
                    </div>
                )}
                {this.props.instagramUser && (
                    <div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://instagram.com/${this.props.instagramUser}`}
                        >
                            <FontAwesomeIcon icon={["fab", "instagram"]} />
                        </a>
                    </div>
                )}
                {this.props.instagramUrl && (
                    <div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={this.props.instagramUrl}
                        >
                            <FontAwesomeIcon icon={["fab", "instagram"]} />
                        </a>
                    </div>
                )}
            </nav>
        );
    }
}

SocialMediaLevel.propTypes = {
    // They're mostly optional, sooo....
};

export default SocialMediaLevel;
