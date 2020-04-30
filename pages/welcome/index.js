import React, { Component } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { actions as editorActions } from "~/ducks/editor";
import { actions as appActions } from "~/ducks/app";
import Emoji from "~/components/Emoji";
import { Link, Router } from "~/routes";

// This is a basic boilerplate.
// access at /welcome. It doesn't work yet. Make it work! ;)
// Most fun homework ever ;)

const StepOne = ({ next }) => (
    <>
        <div className="image-container">
            <img
                src={"/img/onboarding/01-Onboarding-Logo.png"}
                alt={"Makerlog Check Mark"}
            />
        </div>
        <div>
            <h2>Hello!</h2>
            <p>
                Welcome to Makerlog, a community of over 3000 makers &
                entrepreneurs creating things together.
            </p>
            <p>
                We’re super glad to have you here, so come along with us in a
                small tutorial - we’ll teach you the basics, and you’ll become
                more productive in no time.
            </p>
            <button onClick={next} className={"btn-onboard"}>
                Next
            </button>
        </div>
    </>
);

const StepTwo = ({ next, previous }) => (
    <>
        <div className="image-container">
            <img
                src={"/img/onboarding/02-Onboarding-Log.png"}
                alt={"Task Log"}
            />
        </div>
        <div>
            <h2>Your log</h2>
            <p>
                The log is a global feed of what creators around the world are
                doing, and here’s where you’ll interact most of the time.
            </p>
            <p>You’ll be posting tasks to the log in the next step.</p>

            <div className="flex flex-gap">
                <div>
                    {" "}
                    <button onClick={previous} className={"btn btn-light"}>
                        Back
                    </button>
                </div>
                <div>
                    <button onClick={next} className={"btn-onboard"}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    </>
);

class StepThree extends React.Component {
    state = {
        addedTask: false
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.editorOpen !== this.props.editorOpen &&
            this.props.editorOpen === false &&
            prevProps.editorOpen === true
        ) {
            this.props.next();
        }
    }

    onNext = () => {
        const { next, previous } = this.props;
        if (!this.state.addedTask) {
            this.props.toggleEditor();
            this.setState({
                addedTask: true
            });
        } else {
            next();
        }
    };

    render() {
        const { next, previous } = this.props;

        return (
            <>
                <div className="image-container">
                    <img
                        src={"/img/onboarding/03-Onboarding-First-Task.png"}
                        alt={"Makerlog Check Mark"}
                    />
                </div>
                <div>
                    <h2>Your first task</h2>
                    <p>Let’s post your very first task.</p>
                    <p>
                        Click the button below to post something you’ve done
                        today or plan to do. You can add a #hashtag to
                        categorize it later.
                    </p>
                    <div className="flex flex-gap">
                        <div>
                            {" "}
                            <button
                                onClick={previous}
                                className={"btn btn-light"}
                            >
                                Back
                            </button>
                        </div>
                        <div>
                            <button onClick={this.onNext} className={"btn"}>
                                {this.state.addedTask
                                    ? "Next"
                                    : "Add your first task"}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

StepThree = connect(
    state => ({
        editorOpen: state.editor.open
    }),
    dispatch => ({
        toggleEditor: () => dispatch(editorActions.toggleEditor()),
        setEditorValue: v => dispatch(editorActions.setEditorValue(v))
    })
)(StepThree);

const StepFour = ({ next, previous }) => (
    <>
        <div className="image-container">
            <img
                src={"/img/onboarding/04-Onboarding-Streak.png"}
                alt={"Makerlog Check Mark"}
            />
        </div>
        <div>
            <h2>Streaks</h2>
            <p>
                <strong>Great! You posted your first task.</strong> Posting
                tasks earns you a streak, which is a count of consecutive days
                of getting things done.
            </p>
            <p>
                Keep a streak up to rise up in the leaderboards and ship
                products hard!
            </p>
            <div className="flex flex-gap">
                <div>
                    {" "}
                    <button onClick={previous} className={"btn btn-light"}>
                        Back
                    </button>
                </div>
                <div>
                    <button onClick={next} className={"btn-onboard"}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    </>
);

const StepFive = ({ next, previous }) => (
    <>
        <div className="image-container">
            <img
                src={"/img/onboarding/05-Onboarding-Integrations.png"}
                alt={"Makerlog Check Mark"}
            />
        </div>
        <div>
            <h2>Integrations</h2>
            <p>
                Makerlog is an open platform, and there’s community-created
                integrations for just about every productivity app in existence.{" "}
                <br />
                Mac Menubar, Todoist, Telegram... You name it!
            </p>
            <p>
                <Link target="_blank" route="apps">
                    <a>Check them all out here! →</a>
                </Link>
            </p>
            <div className="flex flex-gap">
                <div>
                    {" "}
                    <button onClick={previous} className={"btn btn-light"}>
                        Back
                    </button>
                </div>
                <div>
                    <button onClick={next} className={"btn-onboard"}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    </>
);

class StepSix extends React.Component {
    state = {
        done: false
    };

    onDone = () => {
        if (this.props.isNewUser) {
            this.props.toggleNewUser();
        }

        this.setState({ done: true });
    };

    render() {
        const { next, previous } = this.props;

        if (this.state.done) {
            Router.pushRoute("/log");
        }

        return (
            <>
                <div className="image-container">
                    <img
                        src={"/img/onboarding/06-Onboarding-People-Logo.png"}
                        alt={"Makerlog Check Mark"}
                    />
                </div>
                <div>
                    <h2>That’s it for now!</h2>
                    <p>
                        Welcome to our humble community, and I hope you enjoy
                        your time with us! <Emoji emoji={"✌️"} />
                    </p>
                    <p>Now go meet makers & get productive!</p>
                    <div className="flex flex-gap">
                        <div>
                            <button
                                onClick={previous}
                                className={"btn btn-light prev"}
                            >
                                Back
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={this.onDone}
                                className={"btn-onboard"}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

StepSix = connect(
    state => ({
        isNewUser: state.app.isNewUser
    }),
    dispatch => ({
        toggleNewUser: () => dispatch(appActions.toggleNewUser())
    })
)(StepSix);

class Onboarding extends Component {
    state = {
        step: 1
    };

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        });
    };

    previousStep = () => {
        this.setState({
            step: this.state.step - 1
        });
    };

    render() {
        return (
            <div className="Onboarding">
                <section className={"grid-onboarding"}>
                    {this.state.step === 1 && <StepOne next={this.nextStep} />}
                    {this.state.step === 2 && (
                        <StepTwo
                            next={this.nextStep}
                            previous={this.previousStep}
                        />
                    )}
                    {this.state.step === 3 && (
                        <StepThree
                            next={this.nextStep}
                            previous={this.previousStep}
                        />
                    )}
                    {this.state.step === 4 && (
                        <StepFour
                            next={this.nextStep}
                            previous={this.previousStep}
                        />
                    )}
                    {this.state.step === 5 && (
                        <StepFive
                            next={this.nextStep}
                            previous={this.previousStep}
                        />
                    )}
                    {this.state.step === 6 && (
                        <StepSix previous={this.previousStep} />
                    )}
                </section>
            </div>
        );
    }
}

export default Onboarding;
