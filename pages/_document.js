import React from "react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

import { ServerStyleSheet } from "styled-components";
import config, { isDev } from "../config";
import { isGaEnabled } from "../vendor/ga";

// Sadly we need this as long as we use styled-components. Fuck that.

export default class Document extends NextDocument {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await NextDocument.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    renderAnalytics = () => {
        if (!isGaEnabled) return null;

        // Add extra Optimize code dynamically
        let properties = null;
        let extra = "";
        let autoHideCode = "";
        if (config.GO_TAG) {
            properties = { optimize_id: config.GO_TAG };
            extra = `, ${JSON.stringify(properties)}`;
            // Autohide significantly increases time to first paint, so idk..
            /*autoHideCode = `(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
            h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
            (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
            })(window,document.documentElement,'async-hide','dataLayer',1500,
            {'${config.GO_TAG}':true});`;*/
        }

        return (
            <>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${config.GA_UA}`}
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${config.GA_UA}'${extra});
                ${autoHideCode}
                
                window.$crisp=[];window.CRISP_WEBSITE_ID="9d616a72-dd1d-4958-9884-29fe60d526c2";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
                `
                    }}
                ></script>
                <style jsx global>{`
                    .async-hide {
                        opacity: 0 !important;
                    }
                `}</style>
            </>
        );
    };

    render() {
        return (
            <Html>
                <Head>
                    {this.renderAnalytics()}
                    <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
                    <script
                        src="https://browser.sentry-cdn.com/5.15.4/bundle.min.js"
                        integrity="sha384-Nrg+xiw+qRl3grVrxJtWazjeZmUwoSt0FAVsbthlJ5OMpx0G08bqIq3b/v0hPjhB"
                        crossorigin="anonymous"
                    ></script>
                    <script
                        type="text/javascript"
                        dangerouslySetInnerHTML={{
                            __html: isDev
                                ? ""
                                : `Sentry.init({ dsn: 'https://2a9f23af62a74638b4c5c24a7cc132c2@o197126.ingest.sentry.io/3170364' });`
                        }}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        window['_fs_debug'] = false;
                            window['_fs_host'] = 'fullstory.com';
                            window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
                            window['_fs_org'] = 'V1AX1';
                            window['_fs_namespace'] = 'FS';
                            (function(m,n,e,t,l,o,g,y){
                                if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
                                g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
                                o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
                                y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
                                g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
                                g.anonymize=function(){g.identify(!!0)};
                                g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
                                g.log = function(a,b){g("log",[a,b])};
                                g.consent=function(a){g("consent",!arguments.length||a)};
                                g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
                                g.clearUserCookie=function(){};
                                g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
                                if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
                                g._v="1.2.0";
                            })(window,document,window['_fs_namespace'],'script','user');`
                        }}
                    ></script>
                    <script
                        type="text/javascript"
                        dangerouslySetInnerHTML={{
                            __html: `Paddle.Setup({ vendor: ${
                                config.PADDLE_VENDOR
                            }, debug: ${JSON.stringify(config.isDev)} });`
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
