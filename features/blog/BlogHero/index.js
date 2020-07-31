import React from "react";
import "./index.scss";
import { isServer } from "../../../config";
import { TwitterShareButton } from "react-twitter-embed";
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubscribeCta from "../SubscribeCta";
import OutboundLink from "../../../components/OutboundLink";
import { Link } from "~/routes";

function getUrl() {
    if (isServer) return "";
    return window.location.href;
}

/*


                                        slug={post.slug}
                                        image={post.feature_image}
                                        title={post.title}
                                        description={post.excerpt}
*/

export const BlogHero = ({ post, single = false, ...props }) => {
    if (single) {
        return (
            <div className="BlogHero single">
                <div className="container">
                    <div className="meta-container">
                        <p className="heading">
                            {format(
                                new Date(post.published_at),
                                "MMMM do, yyyy"
                            )}
                            &nbsp;·{" "}
                            {(post.primary_tag && post.primary_tag.name) ||
                                "Uncategorized"}{" "}
                        </p>
                        <h1>{post.title}</h1>
                        <p className="has-text-grey mb-em">{post.excerpt}</p>
                        <div>
                            <TwitterShareButton
                                url={getUrl()}
                                options={{
                                    text: post.title,
                                    via: "getmakerlog",
                                    size: "large"
                                }}
                            />
                        </div>
                    </div>
                    <div
                        className="feature-image"
                        style={
                            post.feature_image
                                ? {
                                      backgroundImage: `url(${post.feature_image})`
                                  }
                                : { background: "var(--c-main)" }
                        }
                    ></div>
                    <div className="blog-post-container mbGap">
                        <div className="blog-post">
                            <div className="share-buttons">
                                <ul>
                                    <li>
                                        <OutboundLink
                                            to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                `${
                                                    post.title
                                                } ${getUrl()} via @getmakerlog`
                                            )}`}
                                        >
                                            <FontAwesomeIcon
                                                icon={["fab", "twitter"]}
                                                size="lg"
                                            />
                                        </OutboundLink>
                                    </li>
                                    <li>
                                        <OutboundLink to="http://news.ycombinator.com/submit">
                                            <FontAwesomeIcon
                                                icon={["fab", "hacker-news"]}
                                                size="lg"
                                            />
                                        </OutboundLink>
                                    </li>
                                    <li>
                                        <OutboundLink
                                            to={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                                getUrl()
                                            )}`}
                                        >
                                            <FontAwesomeIcon
                                                icon={["fab", "linkedin"]}
                                                size="lg"
                                            />
                                        </OutboundLink>
                                    </li>
                                </ul>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.html
                                }}
                            ></div>
                            <SubscribeCta />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="BlogHero"
            style={
                post.feature_image
                    ? {
                          backgroundImage: `url(${post.feature_image})`
                      }
                    : { background: "var(--c-main)" }
            }
        >
            <div className="container">
                <p className="heading has-text-grey-light">Featured story</p>
                <h1 className="has-text-white">{post.title}</h1>
                <p className="has-text-grey-light mb-em">{post.excerpt}</p>
                <div>
                    <Link route="blog-post" params={{ slug: post.slug }}>
                        <a href="" className="btn btn-light">
                            Read
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};
