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
                    price: "$186",
                    offering: () => (
                        <>
                            <strong>Three months</strong> <br />
                            <Emoji emoji="✅" /> Live for 90 days <br />
                            <Emoji emoji="❌" /> No social media posts
                            <h1>$186</h1>
                            <p className="help">10% off!</p>
                        </>
                    )
                },

                {
                    id: 621681,
                    title: "Six months",
                    price: "$351",
                    offering: () => (
                        <>
                            <strong>Six months</strong> <br />
                            <Emoji emoji="✅" /> Live for 180 days <br />
                            <Emoji emoji="✅" /> Posts on our socials
                            <h1>$351</h1>
                            <p className="help">15% off!</p>
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
                    price: "$372",
                    offering: () => (
                        <>
                            <strong>Three months</strong> <br />
                            <Emoji emoji="✅" /> Live for 90 days <br />
                            <Emoji emoji="✅" /> Posts on our socials
                            <h1>$372</h1>
                            <p className="help">10% off!</p>
                        </>
                    )
                },

                {
                    id: 621685,
                    title: "Six months",
                    price: "$703",
                    offering: () => (
                        <>
                            <strong>Six months</strong> <br />
                            <Emoji emoji="✅" /> Live for 180 days <br />
                            <Emoji emoji="✅" /> Posts on our socials
                            <h1>$703</h1>
                            <p className="help">15% off!</p>
                        </>
                    )
                }
            ];

        default:
            return null;
    }
}
