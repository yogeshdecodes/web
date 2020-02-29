import React from "react";
import { getTask } from "~/lib/tasks";
import Head from "~/components/Head";
import "./index.scss";
import ProfilePage from "~/layouts/ProfilePage";
import Task from "~/features/stream/components/Task";

class EntryPage extends React.Component {
    static async getInitialProps({ query }) {
        try {
            const layout = { className: "UserPage" };
            return {
                task: await getTask(query.id),
                layout
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
            <ProfilePage user={task.user}>
                <Head
                    title={`Done by @${task.user.username} |
                    Makerlog`}
                    description={`${task.done ? "✅" : "🕐"} ${task.content}`}
                    ogImage={task.user.avatar}
                />

                <div className="card">
                    <div className="card-content">
                        <Task task={task} defaultOpen />
                    </div>
                </div>
            </ProfilePage>
        );
    }
}

EntryPage.propTypes = {};

export default EntryPage;
