import "~/styles/index.scss";
import "~/vendor/fa";

import App from "next/app";

import ErrorPage from "./_error";
import Head from "~/components/Head";
import NProgressContainer from "../vendor/nprogress";
import Page from "~/layouts/Page";

import createStore from "~/store";
import { Provider } from "react-redux";
import Reactor from "~/components/Reactor";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import config, { isServer } from "~/config";
import nookies, { parseCookies, destroyCookie } from "nookies";
import { actions as authActions } from "~/ducks/auth";
import { actions as appActions } from "~/ducks/app";
import axios from "~/lib/axios";
import DownPage from "~/layouts/DownPage";
import NotificationsView from "~/features/notifications/components/NotificationsView";
import isEmpty from "lodash/isEmpty";
import { gaSetUserId, isGaEnabled } from "../vendor/ga";
import Router from "next/router"; // yes this is correct
import ThemedContainer from "~/layouts/ThemedContainer";
import MobileNav from "~/layouts/MobileNav";
import Editor from "~/features/editor";
import AchievementsView from "../features/achievements/AchievementsView";
import ProfileSetupPage from "~/pages/start/setup";

async function onStoreInit(ctx) {
    // only the sagas here are run on the server side; no async dependencies.
    const { token, timezone } = parseCookies(ctx);
    ctx.store.dispatch(appActions.requestApiHealth());

    if (timezone && timezone !== "" && timezone !== "null") {
        console.log("Makerlog: processing with tz " + timezone);
        axios.defaults.headers.common["X-App-Timezone"] = timezone;
    } else {
        axios.defaults.headers.common["X-App-Timezone"] = config.DEFAULT_TZ;
    }

    if (token && token !== "" && token !== "null") {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        ctx.store.dispatch(authActions.login(null, null, token));
    } else {
        // todo: implement cookie based tz system
        delete axios.defaults.headers.common["Authorization"];
    }
}

class Artemis extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        /* 
        THIS IS DANGEROUS!

        onStoreInit MUST run before getInitialProps, otherwise cross-request-state pollution may occur!
        
        oSI flushes previos request state (tokens) and clears stores. 

        This could be a serious security issue. 
        Do not touch this initialization code unless you know what you're doing.
        */

        if (onStoreInit && isServer) {
            // Loads onServerLoad - this is the place to put your cookie things.
            await onStoreInit(ctx);
        }

        if (typeof Component.getInitialProps === "function") {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    componentDidMount() {
        // rehydrate callbacks at reactor
        /*rehydrate(config, () => {
            if (this.props.store && this.props.store.app) {
                console.log("Artemis: ready.");
                this.props.store.app.setAppReady();
            }
        });*/
        // client-side only, run once on mount
        const currentUserState = this.props.store.getState().user.me;
        const currentAuthState = this.props.store.getState().auth;

        if (isGaEnabled) {
            Router.onRouteChangeComplete = () => {
                if (window.gtag) {
                    console.log("Makerlog/GA: Pageview registered.");
                    window.gtag("config", config.GA_UA, {
                        page_location: window.location.href,
                        page_path: window.location.pathname,
                        page_title: window.document.title
                    });
                }
            };
        }

        if (
            isGaEnabled &&
            currentAuthState.loggedIn &&
            !isEmpty(currentUserState)
        ) {
            gaSetUserId(currentUserState);
        }

        const { timezone } = nookies.get();

        if (timezone && timezone !== "" && timezone !== "null") {
            axios.defaults.headers.common["X-App-Timezone"] = timezone;
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        const { statusCode } = pageProps;
        const errored = statusCode && statusCode >= 400;

        if (!store.getState().app.healthy) return <DownPage />;

        return (
            <Provider store={store}>
                <Head />
                <NProgressContainer spinner={false} />
                <ThemedContainer>
                    <Page {...pageProps.layout}>
                        {errored ? (
                            <ErrorPage statusCode={statusCode} />
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </Page>

                    <Reactor />
                    <Editor />
                    <NotificationsView />
                    <AchievementsView />
                    <MobileNav />
                </ThemedContainer>
            </Provider>
        );
    }
}

export default withRedux(createStore)(withReduxSaga(Artemis));
