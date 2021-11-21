import React, { ReactNode, useEffect, useState } from "react";

import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { NextSeo, NextSeoProps } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import wottleLogo from "../../public/logo.png";
import ConnectWalletButton from "../Components/ConnectWalletButton";
import Footer from "../Components/Footer";
import NavSearchBar from "../Components/Navbar/NavSearchBar";
import { MenuButton } from "../Components/SideMenu";
import navbarStyles from "../styles/navbar.module.css";

type IMainProps = {
  children: ReactNode;
} & NextSeoProps;

const Main = (props: IMainProps) => {
  const router = useRouter();
  const [windowWidth, setWidth] = useState(-1);
  const { children, ...nextSeo } = props;
  const windowBreakpoint = 768;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" key="apple" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
          key="icon16"
        />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>
      <NextSeo
        openGraph={{
          type: "website",
          url: "https://wottlenft.io",
          title: "WottleNFT | A sustainable Cardano NFT Marketplace",
          description:
            "WottleNFT is a sustainable NFT Marketplace built upon the Cardano blockchain.",
          images: [
            {
              url: "/logo.png",
              width: 600,
              height: 600,
              alt: "WottleNFT Logo",
              type: "image/png",
            },
          ],
        }}
        {...nextSeo}
      />
      <IonPage id="main">
        <IonHeader className="ion-no-border">
          <div className="flex items-center justify-between pl-4 md:pl-12 2xl:pl-52 bg-primary-default">
            <div className="flex items-center content-center flex-grow">
              <div
                onClick={() => router.push("/landing")}
                className="flex flex-row items-center cursor-pointer"
              >
                <Image
                  height={70}
                  width={70}
                  layout="fixed"
                  alt="Wottle Logo"
                  src={wottleLogo}
                />
                <span className="p-0 text-xl font-bold">WottleNFT</span>
              </div>
              <NavSearchBar />
            </div>
            {windowWidth === -1 && typeof window !== "undefined"
              ? setWidth(window.innerWidth)
              : windowWidth > windowBreakpoint && (
                  <div className="flex">
                    <div className={navbarStyles.container}>
                      {navInfo.map((nav) => {
                        return (
                          <a
                            key={nav.name}
                            href={nav.tempRoute}
                            className={
                              nav.route === router.pathname
                                ? navbarStyles.selected
                                : ""
                            }
                          >
                            {nav.name}
                          </a>
                        );
                      })}
                    </div>
                    <ConnectWalletButton />
                  </div>
                )}
            {windowWidth < windowBreakpoint && <MenuButton className="mr-4" />}
          </div>
        </IonHeader>
        <IonContent id="main">
          {children}
          <Footer />
        </IonContent>
      </IonPage>
    </div>
  );
};

export { Main };

const navInfo = [
  {
    name: "Marketplace",
    route: "/marketplace",
    tempRoute: "/coming-soon",
  },
  {
    name: "About Us",
    route: "/about",
    tempRoute: "/about",
  },
  {
    name: "Creator",
    route: "/creaters",
    tempRoute: "/coming-soon",
  },
  {
    name: "Mint Now",
    route: "/mint-nft",
    tempRoute: "/mint-nft",
  },
];
