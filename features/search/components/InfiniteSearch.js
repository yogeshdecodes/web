import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../../../components/Spinner";
import orderBy from "lodash/orderBy";
import debounce from "lodash/debounce";
import axios from "~/lib/axios";
import { loadingClass } from "~/lib/utils/random";

class InfiniteSearch extends React.Component {
    _isMounted = false;

    initialState = {
        ready: false,
        loading: false,
        hasMore: true,
        next: null,
        items: [],
        failed: false
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    componentDidMount() {
        this.loadMore(true);
        this._isMounted = true;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) this.loadMore(true);
        if (prevProps.searchFunc !== this.props.searchFunc) {
            if (!this._isMounted) return;
            this.setState(this.initialState, () => {
                this.loadMore(true);
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadMore = debounce(async (initial = false) => {
        let items = this.state.items;
        let ready = true;
        if (initial) {
            items = [];
            ready = false;
        }
        if (!this._isMounted) return;
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
            if (!this._isMounted) return;
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
                dataLength={this.state.items.length}
                next={this.loadMore}
                hasMore={this.state.hasMore}
                style={{ overflow: "none" }}
            >
                <Component items={this.state.items} />

                {this.state.hasMore && (
                    <div className={"center"}>
                        <button
                            className={loadingClass(
                                "btn rounded",
                                this.state.loading
                            )}
                            onClick={() => this.loadMore()}
                        >
                            <FontAwesomeIcon icon={"arrow-circle-down"} />{" "}
                            &nbsp; Load more results...
                        </button>
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
