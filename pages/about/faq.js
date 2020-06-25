import React, { Component } from "react";
import { Link } from "~/routes";
import "./index.scss";
import CompanyPageLayout from "../../layouts/CompanyPage";
import StdPageSidebar from "~/components/sidebar/std-page";

class FaqPage extends Component {
    static async getInitialProps(ctx) {
        return {
            layout: {
                className: "FaqPage"
            }
        };
    }

    render() {
        return (
            <CompanyPageLayout>
                <div className="hero">
                    <div className="container">
                        <h1>Frequently Asked Questions</h1>
                        <p>Here are some common questions about Makerlog.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="grid-c-s mtGap">
                        <div>
                            <div>
                                <div>
                                    <h2 className="mb-em">What is Makerlog?</h2>
                                    <div className="card">
                                        <div className="card-content">
                                            <p>
                                                Makerlog is a community of over
                                                5,000 entrepreneurs in tech
                                                shipping side projects together.
                                                These entrepreneurs, makers, can
                                                post their daily tasks and grow
                                                a network of supportive,
                                                like-minded people! Which, is
                                                pretty awesome.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="mb-em">How does it work?</h2>
                                    <div className="card">
                                        <div className="card-content">
                                            <p>
                                                Makerlog works by logging your
                                                daily project-related tasks,
                                                earning streaks (consecutive
                                                days of work), and interacting
                                                with other makers to get
                                                feedback or early users.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="mb-em">Umm... why?</h2>
                                    <div className="card">
                                        <div className="card-content">
                                            <p>
                                                Making can be a really lonely
                                                thing. Depending on where you
                                                are, you might not have access
                                                to a supportive environment for
                                                your entrepreneurship endeavors.
                                                We believe every maker could
                                                benefit from a group of
                                                like-minded peers to help them
                                                in their journey!
                                                <br />
                                                <br />
                                                Also... Traditional social media
                                                is all about consumption. We're
                                                all about productivity first.
                                                Makerlog's the platform that
                                                makes you more productive rather
                                                than less!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="mb-em">How'd it begin?</h2>
                                    <div className="card">
                                        <div className="card-content">
                                            <p>
                                                I started Makerlog in 2018,
                                                while in high school. I've been
                                                a maker since childhood, and
                                                throughout that entire time I
                                                never really felt anyone
                                                understood what I did. I never
                                                had a support network until I
                                                found the maker community. I
                                                grew to love the community and
                                                developed a huge passion for
                                                this really weird, yet amazing
                                                group of people... I then
                                                decided to make Makerlog to help
                                                push this movement forward.
                                            </p>

                                            <Link
                                                route="profile-page"
                                                params={{ username: "sergio" }}
                                            >
                                                <a>
                                                    <div className="user-signoff">
                                                        <div>
                                                            <img
                                                                src="https://pbs.twimg.com/profile_images/1234753414762024962/EoVhb0jK_400x400.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div>
                                                            Sergio Mattei,
                                                            student founder
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-em">
                                        What's the stack, fam?
                                    </h2>
                                    <div className="card">
                                        <div className="card-content">
                                            <p>
                                                Backend:
                                                <ul>
                                                    <li>Django</li>
                                                    <li>Django Channels</li>
                                                    <li>
                                                        Django REST Framework
                                                    </li>
                                                    <li>Dokku, DigitalOcean</li>
                                                </ul>
                                                <br />
                                                Frontend:
                                                <ul>
                                                    <li>NextJS</li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-em">
                                        How do I add tasks?
                                    </h2>
                                    <div className="card">
                                        <div className="card-content">
                                            <p>
                                                You can add a task on
                                                GetMakerlog.com using the{" "}
                                                <strong>
                                                    completed task or to-do tab
                                                    on your homepage
                                                </strong>
                                                . To change the task's status,
                                                use just switch tabs as you
                                                write.
                                                <br />
                                                <ul>
                                                    <li>
                                                        The default status is{" "}
                                                        <strong>"done"</strong>{" "}
                                                        and it appears as a
                                                        green tick icon.
                                                    </li>
                                                    <li>
                                                        Click on it and it will
                                                        change to an orange
                                                        circle (which sets
                                                        status{" "}
                                                        <strong>"todo"</strong>
                                                        ).
                                                    </li>
                                                    <li>
                                                        Click one more time and
                                                        you will get the orange
                                                        circle to pulsate (which
                                                        sets task as{" "}
                                                        <strong>
                                                            "in progress"
                                                        </strong>
                                                        ).
                                                    </li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="mb-em">
                                            How do I add tasks from Telegram?
                                        </h2>
                                        <div className="card">
                                            <div className="card-content">
                                                <p>
                                                    Join the{" "}
                                                    <a href="https://t.me/Makerlog">
                                                        Makerlog Telegram group
                                                    </a>{" "}
                                                    and then pair your account
                                                    with Makebot by typing{" "}
                                                    <code>/pair</code> to{" "}
                                                    <a href="https://t.me/Makerlogbot">
                                                        MakerlogBot
                                                    </a>
                                                    .
                                                </p>
                                                <br />
                                                <p>
                                                    After pairing you can add
                                                    tasks by using{" "}
                                                    <code>/done</code> or{" "}
                                                    <code>/todo</code> or{" "}
                                                    <code>/now</code> followed
                                                    by the task text.
                                                </p>
                                                <ul>
                                                    <li>
                                                        <code>/done</code> will
                                                        set the task as done
                                                    </li>
                                                    <li>
                                                        <code>/todo</code> will
                                                        set the task as todo
                                                    </li>
                                                    <li>
                                                        <code>/now</code> will
                                                        set the task as in
                                                        progress
                                                    </li>
                                                </ul>
                                                <p>
                                                    You can always type{" "}
                                                    <code>/help</code> to see
                                                    all available commands.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="mb-em">
                                            How do I add tasks from other apps?
                                        </h2>
                                        <div className="card">
                                            <div className="card-content">
                                                <p>
                                                    To see Makerlog
                                                    integrations, check out the{" "}
                                                    <strong>
                                                        Integrations/Apps Page
                                                    </strong>{" "}
                                                    at{" "}
                                                    <Link route={"apps"}>
                                                        <a>Integrations</a>
                                                    </Link>
                                                    .
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="mb-em">
                                            How does the streak work?
                                        </h2>
                                        <div className="card">
                                            <div className="card-content">
                                                <p>
                                                    <ul>
                                                        <li>
                                                            You must add at
                                                            least one task{" "}
                                                            <strong>
                                                                before 12AM in
                                                                your CURRENT
                                                                timezone.
                                                            </strong>{" "}
                                                            (please be aware of
                                                            this when traveling)
                                                        </li>
                                                        <li>
                                                            In progress and todo
                                                            tasks are not
                                                            counted.
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                A task counts
                                                                for the day it
                                                                was marked as
                                                                done, not when
                                                                it was created.
                                                            </strong>{" "}
                                                            If you added a task
                                                            yesterday and
                                                            completed it today,
                                                            it was marked as
                                                            done today and
                                                            counts for today's
                                                            streak. It will
                                                            however remain in
                                                            your log in the day
                                                            you added it.
                                                        </li>
                                                    </ul>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="mb-em">
                                            Help, I lost my streak!
                                        </h2>
                                        <div className="card">
                                            <div className="card-content">
                                                <p>
                                                    Possible reasons:
                                                    <ul>
                                                        <li>
                                                            <strong>
                                                                Travel
                                                            </strong>{" "}
                                                            (check out "How does
                                                            the streak work?"
                                                            above)
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Algorithm issues
                                                            </strong>
                                                        </li>
                                                    </ul>
                                                    If you believe this was an
                                                    error,{" "}
                                                    <a href="https://pm.mattei.dev/issues/">
                                                        add a support ticket
                                                        here
                                                    </a>
                                                    .
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="mb-em">
                                            What are wellness features?
                                        </h2>
                                        <div className="card">
                                            <div className="card-content">
                                                <p>
                                                    <p>
                                                        <strong>
                                                            Resting is very
                                                            important in
                                                            preventing burnout.
                                                            We know that, so
                                                            Makerlog has Rest
                                                            Days and Weekend
                                                            Mode as wellness
                                                            feature.
                                                        </strong>
                                                    </p>
                                                    <p>
                                                        Take days off without
                                                        breaking your streak!
                                                    </p>
                                                    <p>
                                                        You can access the
                                                        Wellness features in{" "}
                                                        <Link to={"settings"}>
                                                            <a>Streaks</a>
                                                        </Link>
                                                        .
                                                    </p>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="mb-em">
                                            How do rest days work?
                                        </h2>
                                        <div className="card">
                                            <div className="card-content">
                                                <p>
                                                    <ul>
                                                        <li>
                                                            You get 1 rest day
                                                            for each 10 days of
                                                            streak
                                                        </li>
                                                        <li>
                                                            Rest days are
                                                            automatically
                                                            applied for the days
                                                            when you don't log
                                                            any tasks
                                                        </li>
                                                        <li>
                                                            Rest days will not
                                                            break your streak,
                                                            but they will not
                                                            count towards it
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                If you don't
                                                                want rest days
                                                                to be
                                                                automatically
                                                                applied
                                                            </strong>
                                                            , you can enable
                                                            Hardcore mode in{" "}
                                                            <Link
                                                                to={"settings"}
                                                            >
                                                                <a>Streaks</a>
                                                            </Link>
                                                            .
                                                        </li>
                                                    </ul>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <StdPageSidebar footer={false} />
                        </div>
                    </div>
                </div>
            </CompanyPageLayout>
        );
    }
}

export default FaqPage;
