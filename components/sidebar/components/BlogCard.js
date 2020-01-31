import React, { Component } from "react";
import OutboundLink from "~/components/OutboundLink";
import Spinner from "~/components/Spinner";
import { getLatestBlogEntry } from "~/lib/stats";
import { truncate } from "~/lib/utils/random";

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
            let data = await getLatestBlogEntry();
            this.setState({
                loading: false,
                failed: false,
                data
            });
        } catch (e) {
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
                    <OutboundLink to={data.link}>
                        <h4>{data.title}</h4>
                    </OutboundLink>
                    <small>
                        <p>{truncate(data.description, 14, "...")}</p>
                        <OutboundLink to={data.link}>
                            <span className="outbound">
                                Read on the MakerBlog &raquo;
                            </span>
                        </OutboundLink>
                    </small>
                </div>
            </div>
        );
    };

    getCss = () => {
        const { data, loading, failed } = this.state;

        if (!loading && !failed && data) {
            return {
                background: `url(${data.thumbnail})`,
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
