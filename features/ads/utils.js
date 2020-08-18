import Emoji from "~/components/Emoji";

export function getPlansForType(type) {
    switch (type) {
        case "ICON":
            return [
                {
                    id: 621677,
                    title: "One month",
                    price: "$69",
                    offering: () => (
                        <>
                            <strong>One month</strong> <br />
                            <Emoji emoji="✅" /> Live for 30 days <br />
                            <Emoji emoji="❌" /> No social media posts
                            <h1>$69</h1>
                        </>
                    )
                },

                {
                    id: 621678,
                    title: "Three months",
                    price: "$207",
                    offering: () => (
                        <>
                            <strong>Three months</strong> <br />
                            <Emoji emoji="✅" /> Live for 90 days <br />
                            <Emoji emoji="❌" /> No social media posts
                            <h1>$207</h1>
                        </>
                    )
                },

                {
                    id: 621681,
                    title: "Six months",
                    price: "$414",
                    offering: () => (
                        <>
                            <strong>Six months</strong> <br />
                            <Emoji emoji="✅" /> Live for 180 days <br />
                            <Emoji emoji="✅" /> Posts on our socials
                            <h1>$414</h1>
                        </>
                    )
                }
            ];

        case "BANNER":
            return [
                {
                    id: 621682,
                    title: "One month",
                    price: "$138",
                    offering: () => (
                        <>
                            <strong>One month</strong> <br />
                            <Emoji emoji="✅" /> Live for 30 days <br />
                            <Emoji emoji="❌" /> No social media posts
                            <h1>$138</h1>
                        </>
                    )
                },

                {
                    id: 621684,
                    title: "Three months",
                    price: "$414",
                    offering: () => (
                        <>
                            <strong>Three months</strong> <br />
                            <Emoji emoji="✅" /> Live for 90 days <br />
                            <Emoji emoji="✅" /> Posts on our socials
                            <h1>$414</h1>
                        </>
                    )
                },

                {
                    id: 621685,
                    title: "Six months",
                    price: "$828",
                    offering: () => (
                        <>
                            <strong>Six months</strong> <br />
                            <Emoji emoji="✅" /> Live for 180 days <br />
                            <Emoji emoji="✅" /> Posts on our socials
                            <h1>$828</h1>
                        </>
                    )
                }
            ];

        default:
            return null;
    }
}
