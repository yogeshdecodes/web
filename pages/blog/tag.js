import React, { Component } from "react";
import { getPostsForTag } from "../../vendor/ghost";
import BlogPageLayout from "../../layouts/BlogPage";
import BlogCard from "../../features/blog/BlogCard";
import BlogPostsRow from "../../features/blog/BlogPostsRow";

class BlogTagPage extends Component {
    static async getInitialProps(ctx) {
        try {
            const posts = await getPostsForTag(ctx.query.slug);
            return {
                posts
            };
        } catch (e) {
            return {
                statusCode: 500
            };
        }
    }

    render() {
        const { posts } = this.props;
        return (
            <BlogPageLayout>
                <div className="mbGap"></div>
                <div className="container">
                    <BlogPostsRow>
                        {posts.map(post => (
                            <BlogCard post={post} key={post.slug} />
                        ))}
                    </BlogPostsRow>
                </div>
            </BlogPageLayout>
        );
    }
}

export default BlogTagPage;
