import React, { useEffect, useState } from "react";

import { IonButton, IonLabel, IonRouterLink } from "@ionic/react";
import { GetServerSideProps } from "next";
import Link from "next/link";

import AuctionCard from "../Components/Auctions/AuctionCard";
import CountdownTimer from "../Components/Auctions/CountdownTimer";
import { Main } from "../templates/Main";
import { Auction } from "../types/Auction";
import { testAuctions } from "../types/testData";

export const getServerSideProps: GetServerSideProps = async (_) => {
  return {
    redirect: {
      destination: "/landing",
      permanent: false,
    },
  };
};

const Index = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  useEffect(() => {
    setAuctions(testAuctions);
  }, []);

  return (
    <Main>
      {auctions[0] && (
        <div className="flex px-16 py-4 text-center truncate h-1/2 place-items-center">
          <img
            className="object-cover w-1/2 h-full p-2 rounded-2xl"
            alt="Auction"
            src={auctions[0].nft.imgUrl}
          />
          <div className="flex flex-col w-1/2 gap-4">
            <IonLabel className="text-2xl" color="primary">
              {auctions[0].nft.asset_name}
            </IonLabel>
            <IonLabel className="text-lg">Time Left:</IonLabel>
            <CountdownTimer
              className="text-lg"
              countdownTimestamp={auctions[0].endingTime}
            />
            <div className="flex">
              <div className="flex flex-col w-1/2 gap-3">
                <IonLabel>Current Bid</IonLabel>
                <IonLabel>10000 ADA</IonLabel>
                <IonLabel>$18000.00</IonLabel>
              </div>
              <div className="flex flex-col w-1/2 gap-2 px-10">
                <IonLabel>Current Holder</IonLabel>
                <IonLabel>Littleholder97</IonLabel>
                <IonButton
                  size="small"
                  shape="round"
                  routerLink={`/auctions/${auctions[0].id}`}
                >
                  Read Story
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-10">
        <div className="flex flex-col">
          <div className="flex justify-between h-12 p-3">
            <span className="text-xl">Live Auctions</span>
            <IonRouterLink href="/auctions" color="primary">
              View All
            </IonRouterLink>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {auctions.length ? (
              auctions.map((auction, idx) => {
                return (
                  <div key={idx} className="h-full">
                    <Link href={`/auctions/${auction.id}`} passHref>
                      <a>
                        <AuctionCard auction={auction} />
                      </a>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <IonLabel className="text-lg text-gray-400">
                  No Live Auctions Right Now
                </IonLabel>
              </div>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Index;
