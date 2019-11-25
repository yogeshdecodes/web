import React from "react";
import AdCard from "~/components/sidebar/AdCard";
import RecentDiscussionsCard from "~/components/sidebar/RecentDiscussionsCard";
import { PeopleCard } from "~/features/users";
import { MyProductsCard } from "~/features/products";
import BroadcastList from "~/components/BroadcastList";
import Sticky from "react-stickynode";
import FooterCard from "~/components/sidebar/FooterCard";
import { isServer } from "~/config";

export default props => (
    <>
        <BroadcastList />
        <PeopleCard newUsers />

        <RecentDiscussionsCard />

        <MyProductsCard />
        <hr />

        <Sticky enabled={!isServer ? window.innerWidth >= 728 : false} top={20}>
            <AdCard />
            <FooterCard />
        </Sticky>
    </>
);
