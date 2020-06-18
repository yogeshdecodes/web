import React from "react";
// import { StreamCard as Card } from "features/stream/components/Stream/components/StreamCard/styled";
import InfiniteSearch from "~/features/search/components/InfiniteSearch";
import {
    searchDiscussions,
    searchProducts,
    searchTasks,
    searchUsers
} from "~/lib/search";
import { ProductList } from "~/features/products";
import Avatar from "~/features/users/components/Avatar";
import Task from "~/features/stream/components/Task";
import UserMediaList from "~/features/users/components/UserMediaList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThreadList from "~/features/discussions/ThreadList";
import ActiveLink from "~/components/ActiveLink";
import { isServer } from "~/config";
import StdPageSidebar from "~/components/sidebar/std-page";

function makeKey(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

class SearchPage extends React.Component {
    static async getInitialProps({ query }) {
        return {
            query: query.query ? query.query : null,
            view: query.view ? query.view : null
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            query: this.getQuery() ? this.getQuery() : ""
        };
    }

    getQuery = () => {
        return this.props.query ? this.props.query : "";
    };

    renderRoute = () => {
        // we do the key thing to do full component rerenders.
        switch (this.props.view) {
            case "makers":
                return (
                    <InfiniteSearch
                        key={makeKey(5)}
                        query={this.state.query}
                        searchFunc={searchUsers}
                        component={props => (
                            <UserMediaList users={props.items} />
                        )}
                    />
                );

            case "tasks":
                return (
                    <InfiniteSearch
                        key={makeKey(5)}
                        query={this.state.query}
                        searchFunc={searchTasks}
                        component={props => (
                            <div className="flex flex-column flex-v-gap ">
                                {props.items.map(t => (
                                    <div className={"flex flex-gap"} key={t.id}>
                                        <div>
                                            <Avatar user={t.user} is={32} />
                                        </div>
                                        <div>
                                            <Task task={t} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                );

            case "discussions":
                return (
                    <InfiniteSearch
                        key={makeKey(5)}
                        query={this.state.query}
                        searchFunc={searchDiscussions}
                        component={props => (
                            <ThreadList threads={props.items} />
                        )}
                    />
                );

            default:
                return (
                    <InfiniteSearch
                        key={makeKey(5)}
                        query={this.state.query}
                        searchFunc={searchProducts}
                        component={props => (
                            <ProductList media products={props.items} />
                        )}
                    />
                );
        }
    };

    render() {
        return (
            <div className="container">
                <div className=" mtGap grid-s-c-s">
                    <div className="SidebarTabs">
                        <ActiveLink
                            activeClassName="active"
                            route="search"
                            params={{ view: "products" }}
                        >
                            <div>
                                <span>Products</span>
                            </div>
                        </ActiveLink>
                        <ActiveLink
                            activeClassName="active"
                            route="search"
                            params={{ view: "makers" }}
                        >
                            <div>
                                <span>Makers</span>
                            </div>
                        </ActiveLink>
                        <ActiveLink
                            activeClassName="active"
                            route="search"
                            params={{ view: "tasks" }}
                        >
                            <div>
                                <span>Tasks</span>
                            </div>
                        </ActiveLink>
                        <ActiveLink
                            activeClassName="active"
                            route="search"
                            params={{ view: "discussions" }}
                        >
                            <div>
                                <span>Discussions</span>
                            </div>
                        </ActiveLink>
                    </div>
                    <div>
                        <div className={"card"}>
                            <header>
                                <input
                                    type={"search"}
                                    value={this.state.query}
                                    onChange={e =>
                                        this.setState({ query: e.target.value })
                                    }
                                    className={"is-fullwidth is-rounded"}
                                    placeholder={"Search anything..."}
                                />
                            </header>
                            <div className={"card-content"}>
                                {this.renderRoute()}
                            </div>
                        </div>
                    </div>
                    <div>
                        <StdPageSidebar />
                    </div>
                </div>
            </div>
        );
    }
}

SearchPage.propTypes = {};

export default SearchPage;
