import "~/styles/theme.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "~/vendor/fa";

import App, { Container } from "next/app";

import ErrorPage from "next/error";
import Head from "~/layouts/Head";
import NProgressContainer from "../vendor/nprogress";
import Page from "~/layouts/Page";

import createStore from "~/store";
import { Provider } from "react-redux";
import Reactor from "~/components/Reactor";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { isServer } from "~/config";
import { parseCookies } from "nookies";
import { actions as authActions } from "~/ducks/auth";
import { actions as userActions } from "~/ducks/user";
import { actions as appActions } from "~/ducks/app";
import { PersistGate } from "redux-persist/integration/react";
import axios from "~/lib/axios";

async function onStoreInit(ctx) {
    // ctx.store.dispatch(actions.reauthenticate(getCookie('token', ctx.req)));
    const { token } = parseCookies(ctx);
    if (token && token !== "" && token !== "null") {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        ctx.store.dispatch(authActions.loginSuccess(token));
        ctx.store.dispatch(userActions.loadUser());
    } else {
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
    }

    render() {
        const { Component, pageProps, store } = this.props;
        const { statusCode } = pageProps;

        if (statusCode && statusCode >= 400) {
            return <ErrorPage statusCode={statusCode} />;
        }

        return (
            <Container>
                <Head />
                <NProgressContainer />

                <Provider store={store}>
                    <PersistGate
                        loading={<div>loadign</div>}
                        persistor={store.__PERSISTOR}
                    >
                        <div>
                            <Page {...pageProps.layout}>
                                <Component {...pageProps} />
                            </Page>

                            <Reactor />
                        </div>
                    </PersistGate>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(createStore)(withReduxSaga(Artemis));
