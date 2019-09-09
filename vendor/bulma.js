import React from "react";
import classNames from "classnames";
export { default as Box } from "reactbulma/lib/components/Box/Box";
export { default as Card } from "reactbulma/lib/components/Card/Card";
export {
    default as Checkbox
} from "reactbulma/lib/components/Checkbox/Checkbox";
export {
    default as Container
} from "reactbulma/lib/components/Container/Container";
export { default as Content } from "reactbulma/lib/components/Content/Content";
export { default as Control } from "reactbulma/lib/components/Control/Control";
export { default as Delete } from "reactbulma/lib/components/Delete/Delete";
export { default as Field } from "reactbulma/lib/components/Field/Field";
export { default as Heading } from "reactbulma/lib/components/Heading/Heading";
export { default as Hero } from "reactbulma/lib/components/Hero/Hero";
export { default as Icon } from "reactbulma/lib/components/Icon/Icon";
export { default as Image } from "reactbulma/lib/components/Image/Image";
export { default as Input } from "reactbulma/lib/components/Input/Input";
export { default as Level } from "reactbulma/lib/components/Level/Level";
export { default as Link } from "reactbulma/lib/components/Link/Link";
export { default as Media } from "reactbulma/lib/components/Media/Media";
export { default as Message } from "reactbulma/lib/components/Message/Message";
export { default as Nav } from "reactbulma/lib/components/Nav/Nav";
export {
    default as Notification
} from "reactbulma/lib/components/Notification/Notification";
export { default as Panel } from "reactbulma/lib/components/Panel/Panel";
export {
    default as Progress
} from "reactbulma/lib/components/Progress/Progress";
export { default as Section } from "reactbulma/lib/components/Section/Section";
export { default as Table } from "reactbulma/lib/components/Table/Table";
export { default as Tabs } from "reactbulma/lib/components/Tabs/Tabs";
export { default as Tag } from "reactbulma/lib/components/Tag/Tag";
export {
    default as Textarea
} from "reactbulma/lib/components/Textarea/Textarea";
export { default as Title } from "reactbulma/lib/components/Title/Title";
export { default as SubTitle } from "reactbulma/lib/components/Title/SubTitle";
export { default as File } from "reactbulma/lib/components/File/File";

const Button = ({
    as: Btn,
    black,
    danger,
    dark,
    info,
    large,
    light,
    link,
    medium,
    fullwidth,
    outlined,
    primary,
    small,
    success,
    text,
    warning,
    white,
    inverted,
    hovered,
    focused,
    active,
    loading,
    rounded,
    className,
    ...props
}) => {
    const classes = classNames(
        "button",
        {
            "is-black": black,
            "is-danger": danger,
            "is-dark": dark,
            "is-info": info,
            "is-large": large,
            "is-light": light,
            "is-link": link,
            "is-medium": medium,
            "is-outlined": outlined,
            "is-primary": primary,
            "is-small": small,
            "is-success": success,
            "is-text": text,
            "is-warning": warning,
            "is-white": white,
            "is-inverted": inverted,
            "is-hovered": hovered,
            "is-focused": focused,
            "is-active": active,
            "is-loading": loading,
            "is-fullwidth": fullwidth,
            "is-rounded": rounded,
            "is-static": props["static"]
        },
        className
    );

    delete props["static"];

    return <Btn className={classes} {...props} />;
};

Button.displayName = "Button";

Button.defaultProps = {
    as: "button"
};

export { Button };
