import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "../../../vendor/bulma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../../../components/Spinner";
import orderBy from "lodash/orderBy";
import debounce from "lodash/debounce";
import axios from "axios";

class InfiniteSearch extends React.Component {
    state = {
        ready: false,
        loading: false,
        hasMore: true,
        next: null,
        items: [],
        failed: false
    };

    componentDidMount() {
        this.loadMore(true);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) this.loadMore(true);
    }

    loadMore = debounce(async (initial = false) => {
        let items = this.state.items;
        let ready = true;
        if (initial) {
            items = [];
            ready = false;
        }
        console.log(initial);
        this.setState({ loading: true, failed: false, items, ready });
        try {
            if (!initial && !this.state.next) {
                return;
            }
            let result = null;
            if (!initial) {
                result = await axios.get(this.state.next);
                result = result.data;
            } else {
                result = await this.props.searchFunc(this.props.query);
            }
            this.setState({
                ready: true,
                loading: false,
                items: [
                    ...this.state.items,
                    ...orderBy(result.results, "rank", "asc").map(r => r.item)
                ],
                next: result.next,
                hasMore: result.next !== null,
                failed: false
            });
        } catch (e) {
            console.log(e);
            this.setState({
                loading: false,
                failed: true
            });
        }
    }, 200);

    render() {
        const Component = this.props.component;

        if (this.props.query === "") {
            return <div className={"center"}>No terms yet.</div>;
        }

        if (!this.state.ready) {
            return <Spinner />;
        }

        if (this.state.items.length === 0 && !this.state.loading) {
            return <div className={"center"}>Nothing found.</div>;
        }

        return (
            <InfiniteScroll
                next={this.loadMore}
                hasMore={this.state.hasMore}
                style={{ overflow: "none" }}
            >
                <Component items={this.state.items} />

                {this.state.hasMore && (
                    <div className={"center"}>
                        <Button
                            loading={this.state.loading}
                            className={"btn rounded"}
                            onClick={this.loadMore}
                        >
                            <FontAwesomeIcon icon={"arrow-circle-down"} />{" "}
                            &nbsp; Load more results...
                        </Button>
                    </div>
                )}
                {!this.state.hasMore && this.state.loading && <Spinner />}
            </InfiniteScroll>
        );
    }
}

InfiniteSearch.propTypes = {
    indexUrl: PropTypes.string
};

export default InfiniteSearch;
