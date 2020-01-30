import { getByUsername } from "~/lib/user";

export async function getProfileProps({ query: { username } }) {
    const layout = { className: "UserPage" };

    try {
        const user = await getByUsername(username);
        return { user, layout: { ...layout } };
    } catch (e) {
        if (e.status_code && e.status_code === 404) {
            return { statusCode: 404 };
        } else {
            return { statusCode: 500 };
        }
    }
}
