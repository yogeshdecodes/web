import React from "react";
import { getRecentQuestions } from "../../lib/discussions";
import { Link } from "react-router-dom";
import Avatar from "../users/components/Avatar/Avatar";
import Spinner from "../../components/Spinner";

class RecentQuestionsList extends React.Component {
    state = {
        loading: true,
        data: null,
        failed: false
    };

    async fetchThreads() {
        this.setState({ loading: true, failed: false });
        let data = null;
        try {
            data = await getRecentQuestions();
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
                        <Link to={`/discussions/${thread.slug}`}>
                            <div>
                                <h2 className={"topic-title"}>
                                    {thread.title}
                                </h2>
                                <div className={"flex flex-gap"}>
                                    <div>
                                        <Avatar is={24} user={thread.owner} />
                                    </div>
                                    <div className={"has-text-grey-light"}>
                                        {thread.reply_count} answers
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

export default RecentQuestionsList;
