import { useEffect, useState } from "react";

import { IonButton, IonSpinner } from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";

import useInterval from "../../hooks/useInterval";
import CopySection from "./CopySection";

type TransactionConfirmation = {
  result: boolean;
};

type Props = {
  transactionId: string;
  policyId: string;
  policyJson: JSON;
  isMainnet: boolean;
  apiUrl: string;
};

const DisplayTransaction = ({
  transactionId,
  policyJson,
  policyId,
  apiUrl,
}: Props) => {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useInterval(
    async () => {
      const response = await axios.get<
        TransactionConfirmation,
        AxiosResponse<TransactionConfirmation>
      >(`${apiUrl}/nft/exists?hash=${transactionId}`);

      setConfirmed(response.data.result);
    },
    confirmed ? null : 2000
  );
  // const url = isMainnet
  //   ? `https://cardanoscan.io/transaction/${transactionId}`
  //   : `https://testnet.cardanoscan.io/transaction/${transactionId}`;

  const poolPmUrl = `https://pool.pm/policy/${policyId}`;

  const policyScript = JSON.stringify(policyJson, null, 2);

  return (
    <>
      <h1 className="text-4xl font-bold">Congratulations!</h1>
      <p>You have minted a Cardano Masterpiece.</p>

      <section className="mt-4">
        Remember, transactions can take a while before they appear on the
        blockchain. You can check your transaction with the transaction hash.
      </section>

      <CopySection label="Transaction Hash" text={transactionId} />
      <section className="flex items-center w-full mt-4">
        <p className="text-2xl font-bold">
          Status:{" "}
          {confirmed ? (
            <span className="text-green-500">Confirmed</span>
          ) : (
            <>
              <span className="text-red-500">{"Not Confirmed"}</span>
              <IonSpinner className="ml-4" color="danger" />
            </>
          )}
        </p>
      </section>
      {confirmed && (
        <section className="w-full mt-2">
          <p>
            You can view your NFTs{" "}
            <Link href="/user-nfts">
              <a className="text-primary-default" target="_blank">
                here
              </a>
            </Link>
          </p>
        </section>
      )}

      <section className="w-full">
        <h2 className="w-full mt-20 text-2xl font-bold">NFT Policy</h2>
        <p>
          NFTs on Cardano are minted with a policy that specifies when a user is
          still allowed to mint an NFT with that policy ID. Without this policy,
          we cannot guarantee that NFTs are unique since anyone can continue to
          mint the exact same NFT over and over again.{" "}
          <b>
            Luckily for you, WottleNFT solves this for you by generating a
            random key that no one else can replicate.
          </b>
        </p>
        <p className="mt-8">
          All you have to do is copy the following <b>Policy Script</b> into the
          following link{" "}
          <a
            className="text-primary-default"
            target="_blank"
            href={poolPmUrl}
            rel="noreferrer"
          >
            pool.pm
          </a>
        </p>
        <CopySection label="Policy ID" text={policyId} />
        <CopySection label="Policy Script" text={policyScript} />
        <IonButton
          expand="full"
          download="policy.json"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            policyScript
          )}`}
        >
          Download Policy Script
        </IonButton>
      </section>
    </>
  );
};

export default DisplayTransaction;
