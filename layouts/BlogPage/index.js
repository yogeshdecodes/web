import React, { Component } from "react";
import NavLink from "~/components/ActiveLink";
import PageNavigation from "~/components/ui/PageNavigation";
import SubscribeModal from "../../features/blog/SubscribeModal";
import Head from "~/components/Head";

class BlogPageLayout extends Component {
    state = {
        subscribeModalOpen: false
    };

    toggleSubscribeModal = () => {
        this.setState({
            subscribeModalOpen: !this.state.subscribeModalOpen
        });
    };

    render() {
        return (
            <>
                <Head
                    title={`Stories`}
                    description={
                        "Where successful and up-and-coming founders tell their stories."
                    }
                    ogImage={`/img/og/stories-og.png`}
                    ogLargeImage={true}
                >
                    <link
                        rel="alternate"
                        type="application/rss+xml"
                        title="RSS Feed for Makerlog Stories"
                        href="https://blog.getmakerlog.com/d49d7c2cc54c03090885322b197dc8/rss"
                    />
                </Head>

                <PageNavigation
                    end={
                        <>
                            <div
                                className="navbar-item"
                                onClick={this.toggleSubscribeModal}
                            >
                                <button className="btn btn-secondary">
                                    Subscribe
                                </button>
                            </div>
                        </>
                    }
                    title={"Stories"}
                >
                    <NavLink route="blog" activeClassName="is-active">
                        <a className="navbar-item">Featured</a>
                    </NavLink>
                    <NavLink
                        route="blog-tag"
                        params={{ slug: "interviews" }}
                        activeClassName="is-active"
                    >
                        <a className="navbar-item">Interviews</a>
                    </NavLink>
                    <NavLink
                        route="blog-tag"
                        params={{ slug: "culture" }}
                        activeClassName="is-active"
                    >
                        <a className="navbar-item">Culture</a>
                    </NavLink>
                    <NavLink
                        route="blog-tag"
                        params={{ slug: "news" }}
                        activeClassName="is-active"
                    >
                        <a className="navbar-item">News</a>
                    </NavLink>
                </PageNavigation>
                <SubscribeModal
                    open={this.state.subscribeModalOpen}
                    onClose={this.toggleSubscribeModal}
                />
                {this.props.children}
            </>
        );
    }
}

export default BlogPageLayout;
