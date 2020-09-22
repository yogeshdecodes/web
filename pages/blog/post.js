import React, { Component } from "react";
import BlogPageLayout from "../../layouts/BlogPage";
import { BlogHero } from "../../features/blog/BlogHero";
import { getPost } from "../../vendor/ghost";
import Head from "~/components/Head";

class BlogPostPage extends Component {
    static async getInitialProps(ctx) {
        try {
            const post = await getPost(ctx.query.slug);
            return {
                post
            };
        } catch (e) {
            return {
                statusCode: 500
            };
        }
    }

    render() {
        const { post } = this.props;
        return (
            <BlogPageLayout>
                <Head
                    title={post.title}
                    description={post.excerpt}
                    ogImage={post.feature_image}
                    ogLargeImage={true}
                />
                <BlogHero single post={this.props.post} />
            </BlogPageLayout>
        );
    }
}

// Mark reading this as done

export default BlogPostPage;
