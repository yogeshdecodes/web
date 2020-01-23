import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Streak from "~/components/Streak";
import Tda from "~/components/Tda";
import { connect } from "react-redux";
import { getByUsername } from "~/lib/user";
import { getUserStats } from "~/lib/stats";
import Emoji from "~/components/Emoji";
import { FollowButton as GatedFollowButton, FullName } from "~/features/users";
import { UserStream } from "~/features/stream";
import { ProductList, ProductsContainer } from "~/features/products";
import Linkify from "react-linkify";
import { UserActivityGraph } from "~/features/stats";
import OutboundLink from "~/components/OutboundLink";
import { getHostname } from "~/lib/utils/products";
import { Avatar } from "~/features/users";
import { Link } from "~/routes";
import Head from "~/components/Head";
import PageNavigation from "~/components/ui/PageNavigation";
import "./index.scss";

function getCoverStyle(user, isBackdrop = false) {
    if (user.header)
        return {
            backgroundImage: `url(${user.header})`,
            backgroundPosition: "center",
            backgroundSize: isBackdrop ? "cover" : "contain",
            backgroundRepeat: "no-repeat"
        };

    return {};
}

class ProfilePage extends React.Component {
    static async getInitialProps({ query: { username } }) {
        const layout = { className: "UserPage" };

        try {
            const user = await getByUsername(username);
            const stats = await getUserStats(user.id);
            return { user, stats, layout: { ...layout } };
        } catch (e) {
            if (e.status_code && e.status_code === 404) {
                return { statusCode: 404 };
            } else {
                return { statusCode: 500 };
            }
        }
    }

    render() {
        const { user, stats } = this.props;

        return (
            <>
                <Head
                    title={`@${user.username}`}
                    description={`${user.username} is on Makerlog, the home of the maker community.`}
                    ogImage={user.avatar || null}
                />
                <section
                    style={getCoverStyle(user, true)}
                    className="header-section"
                >
                    <div
                        style={getCoverStyle(user)}
                        className="container"
                    ></div>
                    <PageNavigation
                        title={
                            <div className="profile-picture">
                                <Avatar user={user} is={128} />
                            </div>
                        }
                    >
                        <h2>
                            <FullName user={user} />
                        </h2>
                        <a className={"navbar-item is-active"}>Activity</a>
                        <a className={"navbar-item"}>Updates</a>
                        <a className={"navbar-item"}>Products</a>
                        <a className={"navbar-item"}>Discussions</a>
                    </PageNavigation>
                </section>
            </>
        );
    }
}

ProfilePage.propTypes = {};

const mapStateToProps = state => ({
    me: state.user.me,
    isLoggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(ProfilePage);
