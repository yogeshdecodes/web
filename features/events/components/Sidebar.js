import AdCard from "~/components/sidebar/components/AdCard";
import AttendeesCard from "./AttendeesCard";
import SmallFooter from "~/components/sidebar/components/SmallFooter";
import React from "react";
import Sticky from "react-stickynode";
import { isServer } from "~/config";

export default props => (
    <>
        <Sticky enabled={!isServer ? window.innerWidth >= 728 : false} top={20}>
            {props.event && (
                <>
                    <AttendeesCard event={props.event} />
                    <br />
                </>
            )}
            <AdCard />
            <SmallFooter />
        </Sticky>
    </>
);
