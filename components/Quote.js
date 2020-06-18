import React from "react";
import PropTypes from "prop-types";
import sample from "lodash/sample";

const quotes = [
    { text: "It's mango time.", from: "Fajar Siddiq" },
    { text: "Ship that sh*t.", from: "Sergio Mattei" },
    { text: "To bake or not to make, that is the question.", from: "Ali" },
    { text: "Why not start another side project?", from: "Arne" },
    { text: "Hey Mom, I made it into the sidebar!", from: "Osamah" },
    { text: "Shiptastic.", from: "James" },
    { text: "Ship || die.", from: "Knightbenax" },
    { text: "What are you waiting for?", from: "Rob" },
    {
        text:
            "Indie products are the friendly, family-owned corner shops of the internet.",
        from: "Ethan"
    },
    {
        text: "The only people who never fail are those who never try.",
        from: "Ilka Chase"
    },
    {
        text: "Failure is just another way to learn how to do something right.",
        from: "Marian Wright Edelman"
    },
    {
        text: "I failed my way to success.",
        from: "Thomas Edison"
    },
    {
        text: "Every failure brings with it the seed of an equivalent success.",
        from: "Napoleon Hill"
    },
    {
        text: "Only those who dare to fail greatly can ever achieve greatly.",
        from: "John F. Kennedy"
    },
    {
        text:
            "It is hard to fail, but it is worse never to have tried to succeed.",
        from: "Theodore Roosevelt"
    },
    {
        text: "Imagination is more important than knowledge.",
        from: "Albert Einstein"
    },
    {
        text:
            "You cannot depend on your eyes when your imagination is out of focus.",
        from: "Mark Twain"
    },
    {
        text: "Commitment leads to action. Action brings your dream closer.",
        from: "Marcia Wieder"
    },
    {
        text: "I never think of the future",
        from: "it comes soon enough."
    },
    {
        text: "The mind that is anxious about future events is miserable.",
        from: "Seneca"
    },
    {
        text:
            "The art of leadership is saying no, not yes. It is very easy to say yes.",
        from: "Tony Blair"
    },
    {
        text: "A leader is a dealer in hope.",
        from: "Napoleon Bonaparte"
    },
    {
        text:
            "While a good leader sustains momentum, a great leader increases it.",
        from: "John C. Maxwell"
    },
    {
        text:
            "To do great things is difficult; but to command great things is more difficult.",
        from: "Friedrich Nietzsche"
    },
    {
        text: "Leadership does not always wear the harness of compromise.",
        from: "Woodrow Wilson"
    },
    {
        text: "Business opportunities are like buses",
        from: "there's always another one coming."
    },
    {
        text:
            "I avoid looking forward or backward, and try to keep looking upward.",
        from: "Charlotte Bronte"
    },
    {
        text: "Every artist was first an amateur.",
        from: "Ralph Waldo Emerson"
    },
    {
        text: "We can do anything we want to do if we stick to it long enough.",
        from: "Helen Keller"
    },
    {
        text: "Insist on yourself. Never imitate.",
        from: "Ralph Waldo Emerson"
    },
    {
        text: "Who looks outside, dreams. Who looks inside, awakes.",
        from: "Carl Jung"
    },
    {
        text: "The only journey is the one within.",
        from: "Rainer Maria Rilke"
    },
    {
        text: "Follow your honest convictions, and stay strong.",
        from: "William Thackeray"
    },
    {
        text: "Happiness is not a goal, but a by-product.",
        from: "Eleanor Roosevelt"
    },
    {
        text:
            "Happiness is not a state to arrive at, but a manner of traveling.",
        from: "Margaret Lee Runbeck"
    },
    {
        text: "Purpose is what gives life a meaning.",
        from: "C. H. Parkhurst"
    },
    {
        text: "In all things that you do, consider the end.",
        from: "Solon"
    },
    {
        text:
            "Life can be pulled by goals just as surely as it can be pushed by drives.",
        from: "Viktor Frankl"
    },
    {
        text: "The virtue lies in the struggle, not in the prize.",
        from: "Richard Monckton Milnes"
    },
    {
        text: "To reach a port, we must sail",
        from: "sail, not tie at anchor"
    },
    {
        text: "Success is the child of audacity.",
        from: "Benjamin Disraeli"
    },
    {
        text: "The secret of success is to know something nobody else knows.",
        from: "Aristotle Onassis"
    },
    {
        text: "The surest way not to fail is to determine to succeed.",
        from: "Richard Brinsley Sheridan"
    }
];

export function getQuote() {
    return sample(quotes);
}

// TODO: Fetch quotes from other sources.
const Quote = ({ quote, author }) => (
    <blockquote>
        "{quote}"<cite>{author}</cite>
    </blockquote>
);

Quote.propTypes = {
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};

export default Quote;
