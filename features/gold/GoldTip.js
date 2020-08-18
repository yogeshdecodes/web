import React from "react";
import PropTypes from "prop-types";
import sample from "lodash/sample";

const tips = [
    {
        title: "Recurring tasks 📅",
        text:
            "Click on a task, then 'set recurring' to make it show up on your to-do list every morning."
    },
    {
        title: "Feature your product ✨",
        text:
            "You can feature your product for 24 hours on all Makerlog pages as a Gold member."
    },
    {
        title: "Post Gold discussions 🤔",
        text:
            "Gold members have their own discussions section, and it's pretty premium."
    },
    {
        title: "Join the chat 💬",
        text:
            "Gold members have access to a private Telegram group. Check this sidebar to join."
    },

    /*{
        title: "Keep things on the down low 🤫",
        text:
            "You can mark products as private and their tasks will only be shown to you."
    },*/
    {
        title: "Keep makers informed 🚨",
        text:
            "With Updates you can keep the community informed with what you're up to. An email newsletter will be sent to your followers."
    },
    {
        title: "Join the dark side 😎",
        text: "Click the toggle in the navigation to turn on Dark Mode. "
    }
];

export function getTip() {
    return sample(tips);
}

// TODO: Fetch quotes from other sources.
const Tip = ({ tip }) => <small>{tip}</small>;

Tip.propTypes = {
    tip: PropTypes.string.isRequired
};

export default Tip;
