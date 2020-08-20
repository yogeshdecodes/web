import React, { Component } from "react";
import Spinner from "~/components/Spinner";
import useSWR from "swr";
import { serveAd } from "../../../lib/ads";
import OutboundLink from "~/components/OutboundLink";
import "./index.scss";

const Ad = ({ booking }) => {
    if (!booking) {
        const { data, error } = useSWR("/ads/serve/", serveAd);
        if (error) return <div>Failed to load ad.</div>;
        if (!data)
            return (
                <div>
                    <center>
                        <Spinner small />
                    </center>
                </div>
            );
        booking = data;
    }
    return (
        <OutboundLink
            href={`https://api.getmakerlog.com/ads/${booking.id}/click/`}
        >
            <div className={"Booking " + booking.type.toLowerCase()}>
                <div className="image">
                    <figure className="is-square is-64x64">
                        <img className={"image"} src={booking.image} />
                    </figure>
                </div>
                <div className="text">{booking.text}</div>
            </div>
        </OutboundLink>
    );
};

export default Ad;
