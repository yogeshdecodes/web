import React from "react";
import AdCard from "~/components/sidebar/AdCard";
import RecentDiscussionsCard from "~/components/sidebar/RecentDiscussionsCard";
import { PeopleCard } from "~/features/users";
import { MyProductsCard } from "~/features/products";
import BroadcastList from "~/components/BroadcastList";
import Sticky from "react-stickynode";
import FooterCard from "~/components/sidebar/FooterCard";

export default props => (
    <>
        <BroadcastList />
        <PeopleCard newUsers />

        <RecentDiscussionsCard />

        <MyProductsCard />
        <hr />

        <Sticky enabled={window.innerWidth >= 728} top={20}>
            <AdCard />
            <FooterCard />
        </Sticky>
    </>
);
