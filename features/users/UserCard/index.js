import React from "react";
import Avatar from "../components/Avatar";
import FullName from "../components/FullName";
import "./index.scss";
import Streak from "../../../components/Streak";
import MakerScore from "../../../components/MakerScore";
import ProductList from "../../products/components/ProductList";
import ProductsContainer from "../../products/containers/ProductsContainer";
import GatedFollowButton from "../components/GatedFollowButton";
import UserActivityGraph from "../../stats/components/UserActivityGraph";
import { Link } from "~/routes";

const UserCard = ({ user }) => {
    let style = { color: "inherit", textDecoration: "none" };
    if (user.header) {
        style[
            "backgroundImage"
        ] = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${user.header})`;
        style["backgroundSize"] = "cover";
    }

    return (
        <div className={"UserCard"}>
            <Link route="profile-page" params={{ username: user.username }}>
                <span className={"cover"} style={style}>
                    <Avatar is={48} user={user} />
                    <div className={"details"}>
                        <h1>
                            <FullName user={user} />
                        </h1>

                        <h2>{user.description}</h2>
                        <div className={"stats"}>
                            {user.streak > 0 && <Streak days={user.streak} />}
                            <MakerScore score={user.maker_score} />
                        </div>
                    </div>
                </span>
            </Link>

            <div className={"contents is-hidden-mobile"}>
                <GatedFollowButton
                    userId={user.id}
                    className={"is-fullwidth"}
                />

                <section className={"activity"}>
                    <h4 className={"heading"}>Activity</h4>
                    <UserActivityGraph user={user} />
                </section>

                <section className={"products"}>
                    <ProductsContainer
                        user={user.id}
                        component={({ products }) => {
                            if (!products.length) return null;

                            return (
                                <>
                                    <h4 className={"heading"}>Products</h4>
                                    <ProductList
                                        thumbnail
                                        products={products}
                                    />
                                </>
                            );
                        }}
                    />
                </section>
            </div>
        </div>
    );
};

export default UserCard;
