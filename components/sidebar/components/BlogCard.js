import React, { Component } from "react";
import OutboundLink from "~/components/OutboundLink";
import { Link } from "~/routes";
import Spinner from "~/components/Spinner";
import { truncate } from "~/lib/utils/random";
import { getLatestPost } from "../../../vendor/ghost";

export default class BlogCard extends Component {
    state = {
        loading: true,
        data: null,
        failed: false
    };

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.setState({
            loading: true,
            failed: false
        });
        try {
            let data = await getLatestPost();
            console.log(data[0]);
            data = data[0];
            this.setState({
                loading: false,
                failed: false,
                data
            });
        } catch (e) {
            console.log(e);
            this.setState({
                failed: true
            });
        }
    };

    renderBlogPost = () => {
        const { data, loading, failed } = this.state;
        return (
            <div className="blog-media flex">
                <div className="flex-grow">
                    <Link route="blog-post" params={{ slug: data.slug }}>
                        <h4>{data.title}</h4>
                    </Link>
                    <small>
                        <p>{truncate(data.excerpt, 14, "...")}</p>
                        <Link route="blog-post" params={{ slug: data.slug }}>
                            <a>Read on the MakerBlog &raquo;</a>
                        </Link>
                    </small>
                </div>
            </div>
        );
    };

    getCss = () => {
        const { data, loading, failed } = this.state;

        if (!loading && !failed && data && data.feature_image) {
            return {
                background: `url(${data.feature_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            };
        }

        return {};
    };

    render() {
        const { user } = this.props;
        const { data, loading, failed } = this.state;

        if (failed) {
            return null;
        }

        return (
            <div className="SidebarBlogCard sidebar-item">
                <h3>From the blog</h3>
                <h4 className="subtitle has-text-grey">Words, many words.</h4>
                <div className="card flex">
                    {data && data.thumbnail && (
                        <div className="thumbnail" style={this.getCss()}></div>
                    )}
                    <div className="card-content">
                        {loading && <Spinner small text="Loading stuff..." />}

                        {data && this.renderBlogPost()}
                    </div>
                </div>
            </div>
        );
    }
}
