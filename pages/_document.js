import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import { ServerStyleSheet } from "styled-components";
import config from "../config";
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
        if (config.GO_TAG) {
            properties = { optimize_id: config.GO_TAG };
            extra = `, ${JSON.stringify(properties)}`;
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
                (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
                h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
                (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
                })(window,document.documentElement,'async-hide','dataLayer',1500,
                {'${config.GO_TAG}':true});`
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
                <Head>{this.renderAnalytics()}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
