import React, { Children } from "react";
import routes, { Link } from "~/routes";

import { withRouter } from "next/router";

const ActiveLink = ({ router, children, ...props }) => {
    const child = Children.only(children);

    let isActiveRoute =
        props.route === undefined
            ? false
            : routes.findAndGetUrls(props.route, props.params).urls.as ===
              router.asPath;

    if (props.iexact) {
        isActiveRoute = router.asPath.startsWith(
            routes.findAndGetUrls(props.route, props.params).urls.as
        );
    }

    let className = child.props.className || "";
    if (isActiveRoute && props.activeClassName) {
        className = `${className} ${props.activeClassName}`.trim();
    }

    delete props.activeClassName;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
