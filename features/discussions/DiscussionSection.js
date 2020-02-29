import React from "react";
import { getRecentDiscussions, getTrendingThreads } from "~/lib/discussions";
import ThreadMediaLine from "./ThreadMediaLine";

class DiscussionSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.prefetchedThreads
                ? this.props.prefetchedThreads
                : [],
            loading: true,
            failed: false
        };
    }

    async fetchThreads() {
        this.setState({ loading: true, failed: false });
        let data = null;
        try {
            if (this.props.top) {
                data = await getTrendingThreads();
            } else {
                data = await getRecentDiscussions();
            }
            this.setState({ data: data, loading: false, failed: false });
        } catch (e) {
            this.setState({ data: null, loading: false, failed: true });
        }
    }

    componentDidMount() {
        if (!this.props.prefetchedThreads) this.fetchThreads();
    }

    render() {
        return (
            <div className="flex flex-v-gap-half flex-column">
                {this.state.data.map(t => (
                    <ThreadMediaLine thread={t} />
                ))}
            </div>
        );
    }
}

export async function prefetchData(top = false) {
    let data = null;
    try {
        if (top) {
            data = await getTrendingThreads();
        } else {
            data = await getRecentDiscussions();
        }

        return {
            prefetchedThreads: data
        };
    } catch (e) {
        console.log("Unable to preload stream.", e);
        return {};
    }
}

export default DiscussionSection;
