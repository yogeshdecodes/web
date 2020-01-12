import "./index.scss";
import { Link } from "~/routes";
import {
    searchDiscussions,
    searchProducts,
    searchTasks,
    searchUsers
} from "../../../../lib/search";

import Avatar from "../../../users/components/Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductList } from "~/features/products";
import React from "react";
import { Task } from "../../../stream";
import ThreadList from "../../../discussions/ThreadList";
import UserMediaList from "../../../users/components/UserMediaList/UserMediaList";
import debounce from "lodash/debounce";
import orderBy from "lodash/orderBy";
import Spinner from "~/components/Spinner";

class GlobalSearchBar extends React.Component {
    state = {
        open: false,
        loading: false,
        query: "",
        users: null,
        products: null,
        tasks: null,
        discussions: null,
        failed: false
    };

    onType = e => {
        this.setState({ query: e.target.value });
        this.getPreliminaryResults();
    };

    toggle = () => {
        const open = !this.state.open;
        if (open) {
            this.sc = document.addEventListener(
                "scroll",
                function(e) {
                    e.preventDefault();
                },
                false
            );
        } else {
            if (this.sc) document.removeEventListener("scroll", this.sc);
        }
        this.setState({
            open
        });
    };

    override = e => {
        if (e.target.matches("#results")) {
            this.toggle();
        } else {
            e.stopPropagation();
        }
    };

    esc = e => {
        e.preventDefault();
        if (e.key === "Escape") this.toggle();
        if (e.key === "Enter") this.navigateToSearch();
    };

    getPreliminaryResults = debounce(async () => {
        this.setState({ loading: true, failed: false });
        try {
            const products = await searchProducts(this.state.query);
            this.setState({
                products: orderBy(products.results, "rank", "asc")
                    .map(el => el.item)
                    .slice(0, 5)
            });
            const users = await searchUsers(this.state.query);
            this.setState({
                users: orderBy(users.results, "rank", "asc")
                    .map(el => el.item)
                    .slice(0, 5)
            });
            const tasks = await searchTasks(this.state.query);
            this.setState({
                loading: false,
                tasks: orderBy(tasks.results, "rank", "asc")
                    .map(el => el.item)
                    .slice(0, 5)
            });
            const discussions = await searchDiscussions(this.state.query);
            this.setState({
                loading: false,
                discussions: orderBy(discussions.results, "rank", "asc")
                    .map(el => el.item)
                    .slice(0, 5)
            });
        } catch (e) {
            this.setState({
                loading: false,
                failed: true,
                products: null,
                users: null,
                tasks: null
            });
        }
    }, 250);

    navigateToSearch = () => {
        this.props.history.push(`/search?q=${this.state.query}`);
    };

    render() {
        const { users, products, tasks, query, discussions } = this.state;

        if (this.state.open) {
            return (
                <div
                    className={"GlobalSearchBar-overlay"}
                    id={"GlobalSearchBar"}
                    onClick={this.override}
                    onKeyUp={this.esc}
                >
                    <div className={"nav-cover"}>
                        <div className={"container form-case v-center"}>
                            <div
                                className={
                                    " search-bar control" +
                                    (this.state.loading ? " is-loading" : "")
                                }
                            >
                                <input
                                    className={"input is-large"}
                                    onChange={this.onType}
                                    value={query}
                                    autoFocus={true}
                                    placeholder={
                                        "Search makers, discussions, tasks, and products..."
                                    }
                                />
                            </div>
                            {this.state.loading ? (
                                <Spinner small color="gray" />
                            ) : (
                                <button
                                    className={"search-button"}
                                    onClick={this.navigateToSearch}
                                >
                                    Search
                                </button>
                            )}
                        </div>
                    </div>
                    <div
                        className={"container results"}
                        id={"results"}
                        onClick={this.override}
                    >
                        {products && products.length > 0 && (
                            <>
                                <h3 className={"is-6"}>Products</h3>
                                <div className={"card"}>
                                    <div className={"card-content"}>
                                        <ProductList
                                            media
                                            products={this.state.products}
                                        />
                                    </div>
                                    <footer>
                                        <Link
                                            route="search"
                                            params={{
                                                view: "products",
                                                query: this.state.query
                                            }}
                                        >
                                            <a
                                                onClick={this.toggle}
                                                className={
                                                    "button is-text is-small"
                                                }
                                            >
                                                {" "}
                                                See all products &raquo;
                                            </a>
                                        </Link>
                                    </footer>
                                </div>
                            </>
                        )}
                        {users && users.length > 0 && (
                            <>
                                <h3 className={"is-6"}>Makers</h3>
                                <div className={"card"}>
                                    <div className={"card-content"}>
                                        <UserMediaList
                                            users={this.state.users}
                                        />
                                    </div>
                                    <footer>
                                        <Link
                                            route="search"
                                            params={{
                                                view: "makers",
                                                query: this.state.query
                                            }}
                                        >
                                            <a
                                                onClick={this.toggle}
                                                className={
                                                    "button is-text is-small"
                                                }
                                            >
                                                See all makers &raquo;
                                            </a>
                                        </Link>
                                    </footer>
                                </div>
                            </>
                        )}
                        {tasks && tasks.length > 0 && (
                            <>
                                <h3 className={"is-6"}>Tasks</h3>
                                <div className={"card"}>
                                    <div className={"card-content"}>
                                        {tasks.map(t => (
                                            <div className={"flex"} key={t.id}>
                                                <div>
                                                    <Avatar
                                                        user={t.user}
                                                        is={32}
                                                    />
                                                </div>
                                                <div>
                                                    <Task task={t} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <footer>
                                        <Link
                                            route="search"
                                            params={{
                                                view: "tasks",
                                                query: this.state.query
                                            }}
                                        >
                                            <a
                                                onClick={this.toggle}
                                                className={
                                                    "button is-text is-small"
                                                }
                                            >
                                                See all tasks &raquo;
                                            </a>
                                        </Link>
                                    </footer>
                                </div>
                            </>
                        )}
                        {discussions && discussions.length > 0 && (
                            <>
                                <h3 className={"is-6"}>Discussions</h3>
                                <div className={"card"}>
                                    <div className={"card-content"}>
                                        <ThreadList threads={discussions} />
                                    </div>
                                    <footer>
                                        <Link
                                            route="search"
                                            params={{
                                                view: "discussions",
                                                query: this.state.query
                                            }}
                                        >
                                            <a
                                                onClick={this.toggle}
                                                className={
                                                    "button is-text is-small"
                                                }
                                            >
                                                See all discussions &raquo;
                                            </a>
                                        </Link>
                                    </footer>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            );
        }

        if (this.props.mobile) {
            return (
                <a onClick={this.toggle} className="item">
                    <span className={"icon"}>
                        <FontAwesomeIcon icon={"search"} />
                    </span>
                    <span>Search</span>
                </a>
            );
        }

        return (
            <a className="navbar-item" onClick={this.toggle}>
                <FontAwesomeIcon size="lg" icon={"search"} />
            </a>
        );
    }
}

export default GlobalSearchBar;
