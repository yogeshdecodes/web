const PLACID_URL = "https://morning-band-e30e.mattei.workers.dev/";

export default function discussionOgImage(title, avatar, replyCount) {
    const path = Buffer.from(
        `u/o5iopzx?text-0=${encodeURIComponent(
            title
        )}&text-1=${encodeURIComponent(
            replyCount + " replies"
        )}&picture-0=%24PIC%24${encodeURIComponent(avatar)}`
    ).toString("base64");
    return PLACID_URL + path;
}
