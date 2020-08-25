import React from "react";
import { connect } from "react-redux";
import { actions as appActions } from "~/ducks/app";
import { actions as userActions } from "~/ducks/user";
import GoldIcon from "~/components/icons/GoldIcon";
import Avatar from "~/features/users/components/Avatar";
import "./index.scss";
import shuffle from "lodash/shuffle";
import ProductIcon from "~features/products/components/ProductIcon";
import GoldPageLayout from "~/layouts/GoldPage";
import orderBy from "lodash/orderBy";

import FullName from "~/components/FullName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutboundLink from "~/components/OutboundLink";
import Spinner from "~/components/Spinner";
import { Link, Router } from "~/routes";
import config from "../../config";
import { getGoldHeroItems } from "../../lib/gold";
import KeyActivityFeed from "../../features/feeds/KeyActivityFeed";
import Countdown from "react-countdown";

/*
{purchased ? (
    <Spinner small text="Activating your Gold..." />
) : (
    <div>
        <button
            onClick={onClickBuy}
            className="btn is-gold"
        >
            Get Gold
        </button>
    </div>
)}
*/

const GoldHero = ({ items, onClickBuy, purchased }) => (
    <div className="hero-container">
        <div className="people-grid-bg">
            {items.map(i => {
                switch (i.type) {
                    case "user":
                        return (
                            <div key={i.id}>
                                <Avatar key={i.id} is={128} user={i} />
                            </div>
                        );

                    case "product":
                        return (
                            <div key={i.id}>
                                <ProductIcon
                                    key={i.slug}
                                    is={128}
                                    product={i}
                                />
                            </div>
                        );
                }
            })}
        </div>
        <div className="container">
            <div className="flex">
                <div className="col">
                    <div className="flex flex-column flex-v-gap">
                        <div>
                            <h1 className="gold-logo gold-color animated fadeInDown">
                                <GoldIcon /> Gold
                            </h1>
                        </div>
                        <div>
                            <p>
                                <strong>
                                    It's time to level up your maker journey.
                                </strong>
                                <br />
                                Ship faster and get exclusive features for just
                                $5/mo.
                            </p>
                        </div>
                       {purchased ? (
                            <Spinner small text="Activating your Gold..." />
                        ) : (
                            <div>
                                <button
                                    onClick={onClickBuy}
                                    className="btn is-gold"
                                >
                                    Get Gold
                                </button>
                            </div>
                        )}
                        <p className="help">
                            We're launching an all-new Gold soon. Stay tuned on
                            our socials.
                        </p>
                    </div>
                    <img
                        className="real-svg"
                        style={{
                            filter: "invert(40%)",
                            opacity: "1"
                        }}
                        src="/img/gold/real-gold.svg"
                    />
                </div>
                <div className="col"></div>
            </div>
        </div>
    </div>
);

const GoldLanding = ({ onClickBuy, users, products, purchased }) => (
    <div className="GoldPage">
        <GoldHero
            purchased={purchased}
            items={[...users, ...products]}
            onClickBuy={onClickBuy}
        />
        <div className="explanation-hero">
            <div className="container">
                <div className="top-copy">
                    <center>
                        <h1>Ship better products, faster.</h1>
                        <p>
                            Makerlog Gold is our exclusive package with
                            incredible features to help keep you shippin'.
                        </p>
                    </center>
                </div>

                <div className="feature-showcase">
                    <div className="image-case is-hidden-mobile">
                        <img
                            src="/img/gold/ship.png"
                            style={{ maxHeight: 80 }}
                            alt=""
                        />
                    </div>
                    <div className="text-case left">
                        <h3>A community that has your back.</h3>
                        <p>
                            Makerlog Gold is the{" "}
                            <strong>heart of the maker community</strong>.
                            <br />
                            We're an exclusive club of makers that has your
                            back, 24/7 -- from development, support, to launch
                            -- we're with you.
                        </p>
                    </div>
                </div>
                <div className="feature-showcase">
                    <div className="text-case right">
                        <h3>Features to drool over.</h3>
                        <p>
                            A gorgeous <strong>dark mode</strong>. <br />{" "}
                            Thoughtful discussions in{" "}
                            <strong>the Gold Lounge</strong>. <br />
                            Save time with{" "}
                            <strong>recurring tasks (soon!)</strong>.
                            <br /> Share more with{" "}
                            <strong>video (soon!)</strong>.
                        </p>
                    </div>
                    <div
                        className="image-case is-hidden-mobile"
                        style={{ paddingBottom: 0 }}
                    >
                        <img src="/img/gold/dark-mode.png" alt="" />
                    </div>
                </div>

                <div className="feature-showcase">
                    <div className="image-case picture is-hidden-mobile">
                        <img src="/img/cool-pictures/image4.jpeg" alt="" />
                    </div>
                    <div className="text-case left">
                        <h3>Built in public by humans.</h3>
                        <p>
                            Makerlog is{" "}
                            <strong>shipped by makers just like you</strong>.
                            <br />
                            Your support helps an indie startup empower makers
                            from all over the world.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {users.length > 0 && (
            <div className="explanation-hero bg">
                <div className="container">
                    <div className="top-copy">
                        <center>
                            <h1 className="has-text-gold">The Gold Club</h1>
                            <p>Our amazing Gold makers are here.</p>
                        </center>
                    </div>

                    <div className="large-user-list flex flex-gap">
                        {users.map(u => (
                            <div key={u.id} className="user">
                                <Link
                                    route="profile-page"
                                    params={{ username: u.username }}
                                >
                                    <a>
                                        <img src={u.avatar} alt="" />
                                    </a>
                                </Link>
                                <div>
                                    <h3>
                                        <FullName user={u} />
                                    </h3>
                                    <p>{u.description}</p>
                                    <div className="user-socials flex flex-gap-half center v-center">
                                        {u.twitter_handle ? (
                                            <div>
                                                <OutboundLink
                                                    to={`https://twitter.com/${u.twitter_handle}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fab",
                                                            "twitter"
                                                        ]}
                                                    />
                                                </OutboundLink>
                                            </div>
                                        ) : null}
                                        {u.instagram_handle ? (
                                            <div>
                                                <OutboundLink
                                                    to={`https://instagram.com/${u.instagram_handle}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={[
                                                            "fab",
                                                            "instagram"
                                                        ]}
                                                    />
                                                </OutboundLink>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        <div className="final-cta">
            <div className="container">
                <div className="flex flex-column flex-v-gap ">
                    <div>
                        <h2>It's time to start a new journey.</h2>
                        <p>Come ship with us.</p>
                    </div>
                    <div>
                       <button onClick={onClickBuy} className="btn is-gold">
                            Get Gold
                        </button>
                    </div>
                    <div>
                        <p className="help">
                            <strong>Coming from WIP?</strong>{" "}
                            <Link route="contact">
                                <a>Message us</a>
                            </Link>
                            , we'll migrate your tasks for free.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

/*

<button onClick={onClickBuy} className="btn is-gold">
    Get Gold
</button>
*/

const GoldWelcomeLetter = connect(state => ({ user: state.user.me }))(
    ({ user, ...props }) => (
        <div className="card">
            <div className="card-content">
                <h2>
                    Welcome to the Gold Club,{" "}
                    {user ? <FullName user={user} /> : "friend"}
                </h2>
                <p className="mb-em">
                    Thanks for supporting the maker movement, and a warm welcome
                    from the makers of Makerlog.{" "}
                </p>
                <div>
                    <button className="btn btn-light btn-small">
                        <FontAwesomeIcon icon={["fab", "twitter"]} /> Tweet
                        #GoldClub
                    </button>
                </div>
            </div>
        </div>
    )
);

const GoldDashboard = props => (
    <GoldPageLayout latestUsers={props.latestUsers}>
        {props.purchased ? <GoldWelcomeLetter /> : null}
        <KeyActivityFeed userId={-1} feed="timeline_gold" />
    </GoldPageLayout>
);

class GoldPage extends React.Component {
    state = { purchased: false };

    static async getInitialProps(ctx) {
        try {
            return {
                heroItems: await getGoldHeroItems()
            };
        } catch (e) {
            console.log(e);
            return {
                heroItems: { users: [], products: [], latest_users: [] }
            };
        }
    }

    onPurchase = () => {
        this.setState({ purchased: true });
        if (this.props.onPurchaseGold) {
            this.props.onPurchaseGold();
        }
    };

    componentDidMount() {
        this.props.forceDark(this.props.hasGold ? this.props.userDark : true);
    }

    componentWillUnmount() {
        this.props.forceDark(this.props.userGold);
    }

    onClickBuy = () => {
        if (!this.props.isLoggedIn) {
            Router.pushRoute("start");
        } else {
            Paddle.Checkout.open({
                product: config.PADDLE_PRODUCT,
                email: this.props.email,
                successCallback: this.onPurchase
            });
        }
    };

    getItems = () => {
        return shuffle([
            ...this.props.heroItems.users.map(u => {
                u.type = "user";
                return u;
            }),
            ...this.props.heroItems.products

                .map(p => {
                    if (!p.icon) return undefined;
                    p.type = "product";
                    return p;
                })
                .filter(p => p !== undefined)
        ]);
    };

    getGoldUsers = () => {
        return orderBy(
            this.getItems().filter(i => i.type === "user"),
            "date_joined",
            "desc"
        );
    };

    getGoldProducts = () => {
        return this.getItems().filter(i => i.type === "product");
    };

    render() {
        if (
            this.props.hasGold
            )
        ) {
            return (
                <GoldDashboard
                    latestUsers={this.props.heroItems.latest_users}
                    purchased={this.state.purchased}
                />
            );
        } else {
            return (
                <GoldLanding
                    users={this.getGoldUsers()}
                    products={this.getGoldProducts()}
                    onClickBuy={this.onClickBuy}
                    purchased={this.state.purchased}
                />
            );
        }
    }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.loggedIn,
        hasGold: state.user.me ? state.user.me.gold : false,
        userGold: state.user.me ? state.user.me.dark_mode : false,
        username: state.user.me ? state.user.me.username : null,
        userDark: state.user.me ? state.user.me.dark_mode : false,
        email: state.user.me ? state.user.me.email : null
    }),
    dispatch => ({
        forceDark: dark => dispatch(appActions.forceDark(dark)),
        onPurchaseGold: () => {
            dispatch(userActions.updateUser({ gold: true }, true)); // patch.
        }
    })
)(GoldPage);
