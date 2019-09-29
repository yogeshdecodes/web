import "~/styles/theme.scss";
import "~/vendor/fa";

import App, { Container } from "next/app";
import { isServer } from "~/config";

import ErrorPage from "next/error";
import Head from "~/layouts/Head";
import NProgressContainer from "../vendor/nprogress";
import Page from "~/layouts/Page";

import { history, persistor } from "~/store";
import Spinner from "~/components/Spinner";
import { Provider } from "react-redux";
import { store } from "~/store";
import Reactor from "~/components/Reactor";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

import createStore from "~/store";

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

        //if (onStoreInit && isServer) {
        // Loads onServerLoad - this is the place to put your cookie things.
        //await onStoreInit(ctx);
        //}

        if (typeof Component.getInitialProps === "function") {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    componentDidMount() {
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
                    <div>
                        <Page {...pageProps.layout}>
                            <Component {...pageProps} />
                        </Page>

                        <Reactor />
                    </div>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(createStore)(withReduxSaga(Artemis));
