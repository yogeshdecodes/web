import AdCard from "~/components/sidebar/AdCard";
import AttendeesCard from "./AttendeesCard";
import FooterCard from "../../../components/sidebar/FooterCard";
import React from "react";
import Sticky from "react-stickynode";

export default props => (
    <>
        <Sticky enabled={window.innerWidth >= 728} top={20}>
            {props.event && (
                <>
                    <AttendeesCard event={props.event} />
                    <br />
                </>
            )}
            <AdCard />
            <FooterCard />
        </Sticky>
    </>
);
