import React from "react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

import config, { isDev } from "../config";
import { isGaEnabled } from "../vendor/ga";

// Sadly we need this as long as we use styled-components. Fuck that.

export default class Document extends NextDocument {

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
                        dangerouslySetInnerHTML={{
                            __html: `(function(h,o,t,j,a,r){
                                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                                h._hjSettings={hjid:1849482,hjsv:6};
                                a=o.getElementsByTagName('head')[0];
                                r=o.createElement('script');r.async=1;
                                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                                a.appendChild(r);
                            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
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
