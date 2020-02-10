import { hasEnded, isOcurring } from "~/lib/utils/events";

import DueCountdown from "~/components/DueCountdown";
import EventFaces from "~/features/events/components/EventFaces";
import React from "react";

export default ({ event }) => {
    return (
        <div class="already-joined flex v-center w-full">
            {!isOcurring(event) ? (
                <div className="joined-text flex-grow">
                    {event.user_joined ? (
                        <strong>You're registered</strong>
                    ) : (
                        <strong>
                            {event.participant_count} makers joined this event
                        </strong>
                    )}
                    <br />
                    <span className="has-text-grey-light">
                        {hasEnded(event) ? (
                            <>Event has ended</>
                        ) : (
                            <>
                                Closes <DueCountdown date={event.closes_at} />
                            </>
                        )}
                    </span>
                </div>
            ) : (
                <div className="joined-text flex-grow">
                    {event.user_joined ? (
                        <strong>You're registered</strong>
                    ) : (
                        <strong>{event.participant_count} shipping now</strong>
                    )}
                    <br />
                    {event.task_count} tasks done
                </div>
            )}
            {event.participant_count > 0 && (
                <div>
                    <EventFaces size={32} slug={event.slug} />
                </div>
            )}
        </div>
    );
};
