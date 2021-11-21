import "../styles/main.css";
import "@ionic/react/css/core.css";
import React, { useEffect } from "react";

import { IonApp } from "@ionic/react";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

import { store } from "../app/store";
import SideMenu from "../Components/SideMenu";
import { pageview } from "../lib/ga";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      pageview(url);
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <IonApp>
        <SideMenu />
        <DefaultSeo
          titleTemplate="WottleNFT | %s"
          defaultTitle="A sustainable Cardano NFT Marketplace"
          description="WottleNFT is a sustainable NFT Marketplace built upon the Cardano blockchain."
          canonical="https://wottlenft.io"
          additionalMetaTags={[
            {
              property: "keywords",
              content:
                "cardano, nft, marketplace, sustainable, auction, nft minter, lowest minting fee, singapore",
            },
          ]}
          twitter={{
            cardType: "summary_large_image",
            site: "@wottlenft",
            handle: "@wottlenft",
          }}
        />
        <Component {...pageProps} />
      </IonApp>
    </Provider>
  );
};

export default MyApp;
