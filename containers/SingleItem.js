import Page from "layouts/Page";
import React from "react";
import { Redirect } from "~/routes";
import axios from "~/lib/axios";
import { axiosWrapper } from "../lib/utils/error";

class SingleItem extends React.Component {
    state = {
        loading: true,
        item: null,
        notFound: false,
        failed: false
    };

    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
            this.fetch();
        }
    }

    fetch = async () => {
        this.setState({
            failed: false,
            item: null,
            notFound: false,
            loading: true
        });
        try {
            const item = await axiosWrapper(axios.get, this.props.url);
            this.setState({ item: item.data, loading: false });
        } catch (e) {
            if (e.status_code && e.status_code === 404) {
                this.setState({ failed: true, notFound: true });
            } else {
                this.setState({ failed: true });
            }
        }
    };

    render() {
        const { item } = this.state;

        const Component = this.props.component;

        if (this.state.notFound) {
            return <Redirect to="/404" />;
        }

        if (this.state.loading) {
            return <Page loading={true} />;
        }

        if (this.state.failed) {
            return (
                <center>
                    <div className="title">
                        Oops! There was a network error.{" "}
                        <button
                            className="button is-medium is-rounded"
                            text
                            onClick={this.fetch}
                        >
                            Retry
                        </button>
                    </div>
                </center>
            );
        }

        return <Component item={item} />;
    }
}

export default SingleItem;
