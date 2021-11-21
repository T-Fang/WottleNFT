import React from "react";

import { IonCardTitle, IonButton } from "@ionic/react";
import { useRouter } from "next/router";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

import CountdownTimer from "../Components/Auctions/CountdownTimer";
import { Main } from "../templates/Main";

const Landing = () => {
  const router = useRouter();
  return (
    <Main>
      <div className="relative flex w-full h-auto min-h-full bg-primary-default">
        <img
          src={`${router.basePath}/assets/background-seascape.png`}
          alt="background seascape"
          className="absolute inset-0 z-0 object-cover w-full h-full"
        />
        <img
          src={`${router.basePath}/assets/angry-thermometer.png`}
          alt="angry thermometer"
          className="absolute bottom-0 left-0 z-0 object-cover h-1/3 lg:h-3/5 xl:h-2/3 2xl:h-4/5"
        />
        <img
          src={`${router.basePath}/assets/corn.png`}
          alt="corn"
          className="absolute bottom-0 right-0 z-0 object-cover h-1/3 lg:h-3/5 xl:h-2/3 2xl:h-4/5"
        />
        <img
          src={`${router.basePath}/assets/thinker.png`}
          alt="thinker"
          className="absolute bottom-0 right-0 z-0 object-cover h-1/6 lg:h-1/4 xl:h-2/5 2xl:h-1/2"
        />
        <div className="z-10 flex flex-col items-center w-full py-20 m-auto text-center">
          <IonCardTitle className="text-5xl font-bold">
            Cardano NFT
          </IonCardTitle>
          <IonCardTitle className="text-5xl font-bold">
            Marketplace
          </IonCardTitle>
          <IonCardTitle className="py-5 text-xl">
            with a sustainable mission
          </IonCardTitle>
          <IonCardTitle className="text-3xl font-bold text-white">
            Live on
          </IonCardTitle>
          <IonCardTitle className="text-2xl text-white">
            1.11.2021 - 11 a.m. UTC
          </IonCardTitle>
          <CountdownTimer
            countdownTimestamp={1635764400}
            className="mt-3 text-3xl text-black md:text-5xl"
          />
          <IonButton
            shape="round"
            color="dark"
            className="w-32 bg-black rounded-full"
            routerLink="/about"
          >
            About us
          </IonButton>
          <div className="flex flex-row gap-3 mt-4">
            <a
              className="text-2xl"
              target="_blank"
              href="https://twitter.com/wottlenft"
              rel="noreferrer"
            >
              <BsTwitter />
            </a>
            <a
              className="text-2xl"
              target="_blank"
              href="https://discord.gg/GcDPbqvcGn"
              rel="noreferrer"
            >
              <FaDiscord />
            </a>
            <a
              className="text-2xl"
              target="_blank"
              href="https://www.instagram.com/wottlenft/"
              rel="noreferrer"
            >
              <BsInstagram />
            </a>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Landing;
