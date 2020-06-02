import React, { Component } from "react";
import { truncate } from "~/lib/utils/random";
import { Link } from "~/routes";
import "./index.scss";

const BlogCard = props => {
    const { post } = props;
    return (
        <Link route="blog-post" params={{ slug: post.slug }}>
            <div
                className="BlogCard"
                style={{
                    background: `linear-gradient(180deg, rgba(0,0,0,0.2) 30%, rgba(0,0,0,1) 100%), url(${post.feature_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div style={{ flexGrow: 1 }}></div>
                <div className="description-container">
                    <p className="heading has-text-white">
                        {(post.primary_tag && post.primary_tag.name) ||
                            "Uncategorized"}
                    </p>
                    <h2 className="has-text-white">{post.title}</h2>
                    <small className="has-text-grey-light">
                        {truncate(post.description, 18, "...")}
                    </small>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
