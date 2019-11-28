import React from "react";
import { connect } from "react-redux";
import { Link } from "~/routes";
import "./index.scss";

const FrequentlyAsked = props => (
    <div className={"card-content"}>
        <h2 className={"topic-title"}>What is Makerlog?</h2>
        <p>
            Makerlog is a community of 3000+ makers achieving their goals
            together, created by{" "}
            <Link route="profile-page" params={{ username: "sergio" }}>
                <a>Sergio Mattei</a>
            </Link>
            .
        </p>
        <h2 className={"topic-title"}>How do I add tasks on Makerlog?</h2>
        <p>
            You can add a task on GetMakerlog.com using the{" "}
            <strong>"Add a new task" button</strong>. To change the task's
            status, use the icon in front of the text field you type the task
            on:
        </p>
        <ul>
            <li>
                The default status is <strong>"done"</strong> and it appears as
                a green tick icon.
            </li>
            <li>
                Click on it and it will change to an orange circle (which sets
                status <strong>"todo"</strong>).
            </li>
            <li>
                Click one more time and you will get the orange circle to
                pulsate (which sets task as <strong>"in progress"</strong>).
            </li>
        </ul>
        <h2 className={"topic-title"}>How do I add tasks from Telegram?</h2>
        <p>You can also add tasks easily from Telegram.</p>
        <p>
            Join the <a href="https://t.me/Makerlog">Makerlog Telegram group</a>{" "}
            and then pair your account with Makebot by typing <code>/pair</code>{" "}
            to <a href="https://t.me/Makerlogbot">MakerlogBot</a>.
        </p>
        <p>
            After pairing you can add tasks by using <code>/done</code> or{" "}
            <code>/todo</code> or <code>/now</code> followed by the task text.
        </p>
        <ul>
            <li>
                <code>/done</code> will set the task as done
            </li>
            <li>
                <code>/todo</code> will set the task as todo
            </li>
            <li>
                <code>/now</code> will set the task as in progress
            </li>
        </ul>
        <p>
            You can always type <code>/help</code> to see all available
            commands.
        </p>
        <h2 className={"topic-title"}>How do I add tasks from other apps?</h2>
        <p>
            To see Makerlog integrations, check out the{" "}
            <strong>Integrations/Apps Page</strong> at{" "}
            <Link route={"apps"}>
                <a>Tasks > Integrations</a>
            </Link>
            .
        </p>
        <p>Currently you can log from:</p>
        <ul>
            <li>Github</li>
            <li>Gitlab</li>
            <li>Telegram</li>
            <li>Todoist</li>
            <li>Trello</li>
            <li>NodeHost</li>
            <li>Slack</li>
            <li>Shipstreams</li>
            <li>... or generate a webhook to log from other apps.</li>
        </ul>
        There's also:
        <ul>
            <li>
                a{" "}
                <a
                    href="https://play.google.com/store/apps/details?id=com.brownfingers.getmakerlog"
                    rel={"noopener noreferrer"}
                    target={"_blank"}
                >
                    mobile client for Android
                </a>{" "}
                by{" "}
                <Link route="profile-page" params={{ username: "arnav" }}>
                    <a>Arnav</a>
                </Link>
            </li>
            <li>
                a{" "}
                <a href="https://menubar.getmakerlog.com/">
                    Mac OS menubar app
                </a>{" "}
                by{" "}
                <Link route="profile-page" params={{ username: "Booligoosh" }}>
                    <a>Ethan</a>
                </Link>
            </li>
            <li>
                <a href="https://today.jipfr.nl/">Today for Makerlog</a> by{" "}
                <Link route="profile-page" params={{ username: "jip" }}>
                    <a>Jip</a>
                </Link>
            </li>
            <li>
                a{" "}
                <a
                    href="https://makerlog-buymeacoffee.netlify.com/"
                    rel={"noopener noreferrer"}
                    target={"_blank"}
                >
                    BuyMeACoffee integration
                </a>{" "}
                by{" "}
                <Link route="profile-page" params={{ username: "voinea" }}>
                    <a>Mihai Voinea</a>
                </Link>
            </li>
            <li>
                <a
                    href="https://github.com/MihaiVoinea/makerlog-cli/"
                    rel={"noopener noreferrer"}
                    target={"_blank"}
                >
                    Makerlog CLI
                </a>{" "}
                by{" "}
                <Link route="profile-page" params={{ username: "voinea" }}>
                    <a>Mihai Voinea</a>
                </Link>
            </li>
            <li>
                <a href="https://assistant.getmakerlog.com/">
                    Makerlog for Google Assistant
                </a>{" "}
                by{" "}
                <Link route="profile-page" params={{ username: "arturs" }}>
                    <a>Arturs Dobrecovs</a>
                </Link>
            </li>
        </ul>
        <h2 className={"topic-title"}>How does the streak work?</h2>
        <ul>
            <li>
                You must add at least one task{" "}
                <strong>before 12AM in your CURRENT timezone.</strong> (please
                be aware of this when traveling)
            </li>
            <li>In progress and todo tasks are not counted.</li>
            <li>
                <strong>
                    A task counts for the day it was marked as done, not when it
                    was created.
                </strong>{" "}
                If you added a task yesterday and completed it today, it was
                marked as done today and counts for today's streak. It will
                however remain in your log in the day you added it.
            </li>
        </ul>
        <h2 className={"topic-title"}>Help, I lost my streak!</h2>
        Possible reasons:
        <ul>
            <li>
                <strong>Travel</strong> (check out "How does the streak work?"
                above)
            </li>
            <li>
                <strong>Algorithm issues</strong>
            </li>
        </ul>
        If you believe this was an error,{" "}
        <a href="https://pm.mattei.dev/issues/">add a support ticket here</a>.
        <h2 className={"topic-title"}>What are wellness features?</h2>
        <p>
            <strong>
                Resting is very important in preventing burnout. We know that,
                so Makerlog has Rest Days and Weekend Mode as wellness feature.
            </strong>
        </p>
        <p>Take days off without breaking your streak!</p>
        <p>
            You can access the Wellness features in{" "}
            <Link to={"wellness"}>
                <a>Tasks > Wellness</a>
            </Link>
            .
        </p>
        <h2 className={"topic-title"}>How do rest days work?</h2>
        <ul>
            <li>You get 1 rest day for each 10 days of streak</li>
            <li>
                Rest days are automatically applied for the days when you don't
                log any tasks
            </li>
            <li>
                Rest days will not break your streak, but they will not count
                towards it
            </li>
            <li>
                <strong>
                    If you don't want rest days to be automatically applied
                </strong>
                , you can enable Hardcore mode in{" "}
                <Link to={"wellness"}>
                    <a>Tasks > Wellness</a>
                </Link>
            </li>
        </ul>
        <h2 className={"topic-title"}>How does weekend mode work?</h2>
        <p>Take the weekends off without breaking your streak!</p>
        <p>
            If weekends are resting time for you and don't ship, activate
            weekend mode.
        </p>
        With weekend mode enabled:
        <ul>
            <li>
                Weekend days will not break your streak, but they will not count
                towards it
            </li>
            <li>
                <strong>Note that Weekend Mode works retroactively!</strong>{" "}
                Means that when you activate it, it will subtract from your
                current streak all previous weekend days, so in some cases a
                decrease of the streak is possible. Turning it off and adding a
                new task will reset that to the previousl value.
            </li>
        </ul>
    </div>
);

class AboutPage extends React.Component {
    render() {
        return (
            <div className="AboutPage">
                <div className={"hero"}>
                    <div className={"container"}>
                        <h2 className={"topic-title"}>
                            Frequently Asked Questions
                        </h2>
                    </div>
                </div>
                <br />
                <section className={"container"}>
                    <div className="card">
                        <FrequentlyAsked />
                    </div>
                </section>
            </div>
        );
    }
}

export default AboutPage;
