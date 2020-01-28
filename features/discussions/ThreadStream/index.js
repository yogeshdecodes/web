import React from "react";
import InfiniteResults from "~/components/InfiniteResults";
import ThreadStreamItem from "./Item";

export default ({ threads, compact = false }) => (
    <InfiniteResults
        url={"/discussions/"}
        withSockets
        socketTypePrefix={"thread"}
        component={({ items }) => (
            <div className={"card"}>
                <div className="card-content">
                    {items.map(t => (
                        <ThreadStreamItem thread={t} key={t.id} />
                    ))}
                </div>
            </div>
        )}
    />
);
