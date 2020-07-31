import React, { Component } from "react";
import "./index.scss";
import { getFeature, getInterviews, getNewsPosts, getPosts } from "../../vendor/ghost";
import { BlogHero } from "../../features/blog/BlogHero";
import BlogPageLayout from "../../layouts/BlogPage";
import SubscribeForm from "../../features/blog/SubscribeForm";
import BlogCard from "../../features/blog/BlogCard";
import BlogPostsRow from "../../features/blog/BlogPostsRow";

// todo: fix 404
const SubscribeCta = () => {
    return (
        <div className="SubscribeCta-hero">
            <div className="container">
                <div className="flex">
                    <div className="flex-grow">
                        <h2>
                            Stories from&nbsp;
                            <span className="brand-underline">
                                successful makers
                            </span>
                            , delivered fresh to your inbox.
                        </h2>
                        <p className="has-text-gray">
                            Subscribe to the MakerBlog for your weekly dose of
                            making inspiration.
                        </p>
                        <br />
                        <SubscribeForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

class BlogPage extends Component {
    static async getInitialProps(ctx) {
        try {
            const feature = await getFeature();
            const posts = await getPosts();
            const news = await getNewsPosts();
            const interviews = await getInterviews(6);
            return {
                posts,
                news,
                interviews,
                feature
            };
        } catch (e) {
            return {
                statusCode: 500
            };
        }
    }

    render() {
        return (
            <BlogPageLayout>
                {this.props.feature && (
                    <div className="mbGap">
                        <BlogHero post={this.props.feature[0]} />
                    </div>
                )}
                <div className="container">
                    <div className="mbGap">
                        <h3>Latest interviews</h3>
                        <h4 className="subtitle has-text-grey mb-em">
                            Up and coming makers tell their stories.
                        </h4>
                    </div>
                    <div className="mbGap">
                        <BlogPostsRow>
                            {this.props.interviews &&
                                this.props.interviews.map(post => (
                                    <div key={post.slug}>
                                        <BlogCard post={post} />
                                    </div>
                                ))}
                        </BlogPostsRow>
                    </div>
                </div>
                <div className="mbGap">
                    <SubscribeCta />
                </div>
                <div className="container">
                    <div className="mbGap">
                        <h3>News</h3>
                        <h4 className="subtitle has-text-grey mb-em">
                            The talk of the town.
                        </h4>
                    </div>
                    <div className="mbGap">
                        <BlogPostsRow>
                            {this.props.news &&
                                this.props.news.map(post => (
                                    <div key={post.slug}>
                                        <BlogCard post={post} />
                                    </div>
                                ))}
                        </BlogPostsRow>
                    </div>
                </div>
            </BlogPageLayout>
        );
    }
}

/*
 <h3>Fire Tweets™️</h3>
                            <h4 className="subtitle has-text-white mb-em">
                                The freshest tweets & news from around the maker
                                community.
                            </h4>
                            <div className="BlogPostsRow"></div>
*/

export default BlogPage;
