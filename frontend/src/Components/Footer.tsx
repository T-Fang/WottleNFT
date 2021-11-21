import React from "react";

import Link from "next/link";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  // const [email, setEmail] = useState<string>();
  return (
    <div className="w-full h-auto truncate bg-gray-700">
      <div className="flex flex-col md:flex-row place-content-around">
        <div className="flex flex-col gap-5 px-8 pt-12 text-white md:px-12">
          <div className="flex flex-row">
            <span>
              <b>Keeping up with</b>
            </span>
            <span className="text-primary-default ml-1.5">
              <b>WottleNFT</b>
            </span>
            <div className="flex flex-row gap-3 pt-1 ml-4">
              <a
                target="_blank"
                className="text-primary-default"
                href="https://twitter.com/wottlenft"
                rel="noreferrer"
              >
                <BsTwitter />
              </a>
              <a
                target="_blank"
                className="text-primary-default"
                href="https://discord.gg/GcDPbqvcGn"
                rel="noreferrer"
              >
                <FaDiscord />
              </a>
              <a
                className="text-primary-default"
                target="_blank"
                href="https://www.instagram.com/wottlenft/"
                rel="noreferrer"
              >
                <BsInstagram />
              </a>
            </div>
          </div>
          <p>
            Follow us on our social media to receive <br /> the latest updates
          </p>
          {/* <div className="flex flex-row flex-wrap items-center gap-4 mt-7">
            <div className="px-3 bg-white rounded-full">
              <input
                type="text"
                value={email}
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="text-black rounded-lg h-9"
              ></input>
            </div>
            <IonButton shape="round" className="pr-3">
              Join us
            </IonButton>
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-5 p-8 px-8 md:px-12 md:pl-0 lg:grid-cols-3 xl:grid-cols-4 justify-self-center">
          <div className="flex flex-col">
            <span className="text-primary-default">Marketplace</span>
            <Link href="/coming-soon" passHref>
              <a className="text-white">Browse</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">NFT Minter</span>
            <Link href="/mint-nft" passHref>
              <a className="text-white">Mint Now</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Creator</span>
            <Link href="/coming-soon" passHref>
              <a className="text-white">Profiles</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Company</span>
            <Link href="/about" passHref>
              <a className="text-white">About Us</a>
            </Link>
            <Link href="/partners" passHref>
              <a className="text-white">Partners</a>
            </Link>
            <Link href="https://twitter.com/wottlenft" passHref>
              <a target="_blank" className="text-white">
                Twitter
              </a>
            </Link>
            <Link href="https://discord.gg/GcDPbqvcGn" passHref>
              <a target="_blank" className="text-white">
                Discord
              </a>
            </Link>
            <Link href="https://www.instagram.com/wottlenft/" passHref>
              <a target="_blank" className="text-white">
                Instagram
              </a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Auction</span>
            <Link href="/coming-soon" passHref>
              <a className="text-white">Coming Soon</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Staking Pool</span>
            <Link href="/coming-soon" passHref>
              <a className="text-white">Stake Now</a>
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-primary-default">Impact</span>
            <Link href="/social-enterprises" passHref>
              <a className="text-white">Social Enterprises</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
