import React from "react";
import {getTrendingThreads} from "../../lib/discussions";
import {Link} from "~/routes";
import Spinner from "../../components/Spinner";
import ReplyFaces from "./ReplyFaces";

class TrendingDiscussionList extends React.Component {
    state = {
        loading: true,
        data: null,
        failed: false
    };

    async fetchThreads() {
        this.setState({ loading: true, failed: false });
        let data = null;
        try {
            data = await getTrendingThreads();
            this.setState({ data: data, loading: false, failed: false });
        } catch (e) {
            this.setState({ data: null, loading: false, failed: true });
        }
    }

    componentDidMount() {
        this.fetchThreads();
    }

    onEditProduct = () => {
        this.fetchThreads();
    };

    render() {
        if (this.state.loading) {
            return <Spinner small={true} />;
        }

        if (this.state.failed && this.state.loading === false) {
            return (
                <h3 className={"center"}>
                    Failed to load threads.{" "}
                    <button
                        className={"btn"}
                        onClick={() => this.fetchThreads()}
                    >
                        Try again &raquo;
                    </button>
                </h3>
            );
        } else if (!this.state.loading && !this.state.failed) {
            // You can optionally pass these to child products (onEdit and onDelete) if you want functionality like this in your view. Works with cards.
            // ProductList picks this up automatically.
            return (
                <div className={"RecentQuestionsList"}>
                    {this.state.data.map(thread => (
                        <Link
                            route={"discussion-page"}
                            params={{ slug: thread.slug }}
                        >
                            <div>
                                <h2 className={"topic-title"}>
                                    {thread.title}
                                </h2>
                                <div className={"flex flex-gap"}>
                                    <div className={"has-text-grey-light"}>
                                        {thread.type === "QUESTION"
                                            ? `${thread.reply_count} answers`
                                            : `${thread.reply_count} replies`}
                                    </div>
                                    <div>
                                        <ReplyFaces
                                            withOwner
                                            threadSlug={thread.slug}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            );
        }
    }
}

export default TrendingDiscussionList;
