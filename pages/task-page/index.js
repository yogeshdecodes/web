import React from "react";
import { getTask } from "~/lib/tasks";
import { CommentsBox } from "~/features/comments";
import { EntryDetail } from "~/features/stream";
import UserCard from "~/features/users/UserCard";
import Sticky from "react-stickynode";
import { isServer } from "~/config";
import Head from "~/components/Head";
import "./index.scss";

class EntryPage extends React.Component {
    static async getInitialProps({ query }) {
        try {
            return {
                task: await getTask(query.id)
            };
        } catch (e) {
            if (e.status_code && e.status_code === 404) {
                return {
                    statusCode: 404
                };
            } else {
                return {
                    statusCode: 500
                };
            }
        }
    }

    render() {
        const { task } = this.props;

        return (
            <div className="EntryPage container">
                <Head
                    title={`Done by @${task.user.username} |
                    Makerlog`}
                    description={`${task.done ? "✅" : "🕐"} ${task.content}`}
                    ogImage={task.user.avatar}
                />

                <div className={"columns"}>
                    <div className={"column is-one-quarter"}>
                        <Sticky
                            enabled={
                                !isServer ? window.innerWidth >= 728 : true
                            }
                            top={30}
                        >
                            <UserCard user={task.user} />
                        </Sticky>
                    </div>
                    <div className={"column"}>
                        <EntryDetail task={task} />
                        <br />
                        <CommentsBox indexUrl={`/tasks/${task.id}/`} />
                    </div>
                </div>
            </div>
        );
    }
}

EntryPage.propTypes = {};

export default EntryPage;
