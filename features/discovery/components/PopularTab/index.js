import React from "react";
import Sticky from "react-stickynode";
import LoggedOutMessage from "~/components/LoggedOutMessage";
import { getPopularTasks } from "~/lib/stats";
import Spinner from "~/components/Spinner";
import { Avatar, PeopleCard } from "~/features/users";
import { Entry } from "~/features/stream";
import AdCard from "~/components/sidebar/components/AdCard";
import "./index.scss";

class PopularTaskList extends React.Component {
    state = {
        loading: true,
        tasks: null,
        failed: false
    };

    componentDidMount() {
        this.fetchPopularTasks();
    }

    fetchPopularTasks = async () => {
        this.setState({
            loading: true
        });
        try {
            const tasks = await getPopularTasks();
            this.setState({
                loading: false,
                tasks: tasks,
                failed: false
            });
        } catch (e) {
            this.setState({
                loading: false,
                tasks: null,
                failed: true
            });
        }
    };

    render() {
        if (this.state.loading && this.state.tasks === null) {
            return <Spinner />;
        }

        if (this.state.failed) {
            return (
                <strong>
                    Failed to load tasks.{" "}
                    <button
                        onClick={this.fetchPopularTasks}
                        className={"btn-link"}
                    >
                        Retry
                    </button>
                </strong>
            );
        }

        return (
            <div>
                <h3 className={"mt0"}>Trending today</h3>
                <div className={"card"}>
                    <div className={"card-content"}>
                        {this.state.tasks.map(t => (
                            <div
                                className={"flex flex-gap flex-v-gap"}
                                key={t.id}
                            >
                                <div>
                                    <Avatar user={t.user} is={32} />
                                </div>
                                <div>
                                    <Entry task={t} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

class PopularTab extends React.Component {
    render() {
        const props = this.props;

        return (
            <section className={"container PopularTab"}>
                <LoggedOutMessage />
                <div className={"grid-c-s"}>
                    <div>
                        <PopularTaskList />
                    </div>
                    <div className={"sidebar is-hidden-mobile"}>
                        <Sticky enabled={true} top={30}>
                            <PeopleCard worldStats={props.worldStats} />
                            <hr />
                            <AdCard />
                        </Sticky>
                    </div>
                </div>
            </section>
        );
    }
}

PopularTab.propTypes = {};

export default PopularTab;
