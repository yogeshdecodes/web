import React from "react";
import { LoggedOutOnly, PeopleCard } from "~/features/users";
import TrendingDiscussionsCard from "~/components/sidebar/TrendingDiscussionsCard";
import AdCard from "~/components/sidebar/AdCard";
import RegisterCard from "~/components/sidebar/RegisterCard";
import Sticky from "react-stickynode";

const Sidebar = () => {
    return (
        <div>
            <PeopleCard withDiscussions={false} recentlyLaunched />

            <TrendingDiscussionsCard />

            <AdCard />

            <Sticky top={30}>
                <LoggedOutOnly>
                    <RegisterCard />
                </LoggedOutOnly>
            </Sticky>
        </div>
    );
};

export default Sidebar;
