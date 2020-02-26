import React from "react";
import { FullName } from "~/features/users";
import { Avatar } from "~/features/users";
import Head from "~/components/Head";
import PageNavigation from "~/components/ui/PageNavigation";
import ProfileSidebar from "~/components/sidebar/profile-page";
import "./index.scss";
import { connect } from "react-redux";
import NavLink from "~/components/ActiveLink";
import { Link } from "~/routes";

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

const mapStateToProps = state => ({
    me: state.user.me ? state.user.me : {}
});

export default connect(mapStateToProps)(({ user, me = {}, ...props }) => {
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
                <div style={getCoverStyle(user)} className="container"></div>
                <PageNavigation
                    title={
                        <div className="profile-picture">
                            <Avatar user={user} is={128} />
                        </div>
                    }
                    end={
                        me.id === user.id ? (
                            <div className="navbar-item">
                                <Link route="settings">
                                    <a className="btn btn-light">Edit</a>
                                </Link>
                            </div>
                        ) : null
                    }
                >
                    <h2>
                        <FullName user={user} />
                    </h2>
                    <NavLink
                        activeClassName="is-active"
                        route="profile-page"
                        params={{ username: user.username }}
                    >
                        <a className={"navbar-item"}>Activity</a>
                    </NavLink>
                    <NavLink
                        activeClassName="is-active"
                        route="profile-page-updates"
                        params={{ username: user.username }}
                    >
                        <a className={"navbar-item disabled"}>
                            Updates <span className="tag">soon</span>
                        </a>
                    </NavLink>
                    <NavLink
                        activeClassName="is-active"
                        route="profile-page-products"
                        params={{ username: user.username }}
                    >
                        <a className={"navbar-item"}>Products</a>
                    </NavLink>
                    <NavLink
                        activeClassName="is-active"
                        route="profile-page-discussions"
                        params={{ username: user.username }}
                    >
                        <a className={"navbar-item"}>Discussions</a>
                    </NavLink>
                </PageNavigation>
            </section>

            <div className="container">
                <div className="grid-c-s">
                    <div>{props.children}</div>
                    <div>
                        <ProfileSidebar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
});
