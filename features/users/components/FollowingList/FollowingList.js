import React from "react";
import { getFollowing } from "~/lib/user";
import Spinner from "../../../../components/Spinner";
import orderBy from "lodash/orderBy";
import UserMedia from "../UserMedia";
import { getWorldStats } from "../../../../lib/stats";
import { Link } from "~/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FollowingCard = ({ hasFollows, children }) => (
    <div className={"card"}>
        <header>
            <h3>{hasFollows ? "Following" : "Makers to follow"}</h3>
        </header>
        <div
            className={"card-content"}
            style={{
                padding: 20,
                paddingTop: 10,
                paddingBottom: 10,
                maxHeight: 400,
                overflowY: "auto"
            }}
        >
            {children}
        </div>
        {!hasFollows && (
            <footer className={"card-footer"}>
                <Link route="explore-makers">
                    <a>
                        <FontAwesomeIcon icon={"users"} />
                        Discover more makers &raquo;
                    </a>
                </Link>
            </footer>
        )}
    </div>
);

class FollowingList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            failed: false,
            people: [],
            hasNoFollows: false
        };
    }

    async componentDidMount() {
        this.fetchFollowing();
    }

    fetchFollowing = async () => {
        try {
            let people = await getFollowing();
            people = orderBy(people, "streak", "desc");
            if (people.length === 0) {
                let worldStats = await getWorldStats();
                people = worldStats.top_users;
                this.setState({
                    loading: false,
                    failed: false,
                    people: people,
                    hasNoFollows: true
                });
            } else {
                this.setState({
                    loading: false,
                    failed: false,
                    people: people
                });
            }
        } catch (e) {
            this.setState({ loading: false, failed: true, people: [] });
        }
    };

    render() {
        if (this.state.loading) {
            return (
                <FollowingCard hasFollows={!this.state.hasNoFollows}>
                    <Spinner text={"Loading makers..."} small={true} />
                </FollowingCard>
            );
        } else if (this.state.failed) {
            return (
                <FollowingCard hasFollows={!this.state.hasNoFollows}>
                    Failed to load your following.{" "}
                    <button onClick={this.fetchFollowing}>Retry.</button>
                </FollowingCard>
            );
        }

        return (
            <FollowingCard hasFollows={!this.state.hasNoFollows}>
                {this.state.people.length === 0 && (
                    <div className={"center"}>
                        <h4>You aren't following anyone yet.</h4>
                    </div>
                )}

                {this.state.people.map(user => (
                    <div>
                        <UserMedia user={user} />
                    </div>
                ))}
            </FollowingCard>
        );
    }
}

FollowingList.propTypes = {};

export default FollowingList;
