import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import nftMinted from "../../public/assets/about/minted.png";
import poolParty from "../../public/assets/about/pool_party.png";
import targetWottles from "../../public/assets/about/target_wottles.png";
import wottleStand from "../../public/assets/about/wottle_stand.png";
import roadmap from "../../public/assets/roadmap.png";
import ButtonPill from "../Components/About/ButtonPill";
import FounderProfile from "../Components/About/FounderProfile";
import { Main } from "../templates/Main";

const About = () => {
  const router = useRouter();

  // Long paragraph contents
  const ourStory = (
    <p className="text-xl">
      Here at WottleNFT, we aim to bring out the <b>true value</b> behind each
      Cardano NFT by providing a space for the Creators to share their stories.
      It is also important to give back, especially with the outbreak of the{" "}
      <b>Covid-19 Pandemic</b>. That is why, WottleNFT will be aligning its
      business model with the United Nation Sustainable Development Goals (
      <b>SDGs</b>) to support Social Enterprises worldwide. Furthermore, we are
      empowering you to support them! With every transaction made on WottleNFT,
      you get to choose which of the UN Goal to support. For now, WottleNFT is
      focusing on 3 UN Goals : Zero Hunger, Climate Action and Quality
      Education.
    </p>
  );

  const ourFocus = (
    <p className="text-xl">
      WottleNFT aims to focus on storytelling to allow more transparent pricing.
      Interested collectors collectively decide where and how far prices should
      go. No more unilateral pricing decisions conducted by creators in obscure
      blackboxes. Everyone has a say in what price best reflects an NFT’s value.
    </p>
  );

  const marketPlace = (
    <p className="text-xl">
      WottleNFT will first focus on building an amazing marketplace. Afterwhich,
      we aim to integrate Cardano Smart Contracts by December. Listing is{" "}
      <b>FREE*</b>. You just need to pay <b>~2₳</b> : <b>1₳</b> pegged to your
      NFT and <b>~1₳</b> for transactional Fee. Upon successful sale, we charge
      a <b>3%</b> fee, with a minimum of <b>2₳</b> for each transaction. This
      fee comprises: Service Fees <b>(1₳,1%)</b> and Social Donations{" "}
      <b>(1₳,1%)</b>. If you are a successful buyer/seller, head over to the
      profile section to choose one of the 3 UN Goals to support : Zero Hunger,
      Climate Action or Quality Education
    </p>
  );

  const auction = (
    <p className="text-xl">
      By Q1 2022, WottleNFT will be releasing Auctions. We will release more
      details closer to launch date. Stay tuned!
    </p>
  );

  const nftMinter = (
    <p className="text-xl">
      WottleNFT wants to make Cardano NFT as easy and as accessible to everyone.
      As such, we have implemented a whole new in-browser experience that offers
      the lowest minting service fee in the market.{" "}
      <b>Mint 1 Cardano NFT for 1 ADA in just under 1 Minute</b> with our very
      own Nami Wallet enabled NFT-minter.
    </p>
  );

  const stakingPool = (
    <p className="text-xl">
      <p className="mb-5">
        WottleNFT is running a sustainable staking pool <b>[WOT]</b> built on
        multi-Raspberry Pi system. By supporting WottleNFT, you are supporting
        Social Enterprises as <b>10%</b> of <b>[WOT]</b>’s rewards will be
        channeled towards Social Enterprises.
      </p>
      <p>
        Furthermore, we are offering <b>0% fees</b>! As a reward, delegators who
        stake a minimum of <b>1000 ADA</b> will receive our very first,{" "}
        <b>exclusive utility NFT drop</b> by the start of next year! More
        information will be released soon.
      </p>
    </p>
  );

  return (
    <Main title="About Us">
      <div className="flex justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover min-w-1200 bg-primary-default bg-background-seascape">
        <div className="z-10 w-2/5 pl-8 pr-2 md:ml-14 2xl:ml-56 my-44 max-w-maxScreen">
          <p className="mb-16 text-4xl font-bold leading-snug break-words sm:break-normal md:text-5xl lg:text-6xl">
            CREATING A GLOBAL <br />
            INTERCONNECTED <br />
            ECOSYSTEM
          </p>
          <p className="mb-10 text-xl font-bold leading-tight lg:text-3xl">
            BETWEEN CARDANO NFTS <br />
            AND SOCIAL ENTERPRISES WHILE SHARING THE STORIES BEHIND EACH CARDANO
            NFT.
          </p>
        </div>
        <img
          className="z-0 self-end object-contain h-2/6 lg:h-1/2 xl:h-5/6"
          src={`${router.basePath}/assets/everyone-together.png`}
          alt="all wottles"
        />
      </div>
      <div className="w-full px-8 pt-20 pb-0 text-justify lg:text-left md:px-20 2xl:px-56 2xl:max-w-maxBody 2xl:m-auto">
        <p className="text-5xl font-bold mb-11">OUR STORY</p>
        {ourStory}
        <div className="flex flex-wrap justify-center py-5 lg:justify-between lg:flex-nowrap">
          <Image
            src={targetWottles}
            alt="Wottles used as target practice"
            height={400}
            width={400}
            className="object-contain"
          />
          <div className="flex flex-col justify-center w-full lg:w-1/2">
            <p className="text-5xl font-bold mb-11">Our Focus</p>
            {ourFocus}
          </div>
        </div>
        <div className="flex flex-wrap-reverse justify-center py-5 lg:justify-between lg:flex-nowrap">
          <div className="flex flex-col justify-center w-full lg:w-1/2">
            <p className="text-5xl font-bold mb-11">Marketplace</p>
            {marketPlace}
            <Link href="/coming-soon" passHref>
              <ButtonPill
                text="View Marketplace"
                onClick={() => {}}
                className="self-center my-8 hover:scale-105"
              />
            </Link>
          </div>
          <Image
            src={wottleStand}
            alt="Wottle marketplace"
            height={400}
            width={400}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-5xl font-bold mb-11">Auction (Coming Soon)</p>
          {auction}
          <Link href="/coming-soon" passHref>
            <ButtonPill
              text="View Auctions"
              onClick={() => {}}
              className="self-center my-8 hover:scale-105"
            />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center py-5 lg:flex-nowrap lg:justify-between">
          <Image
            src={nftMinted}
            alt="NFT Minted"
            height={400}
            width={400}
            className="object-contain"
          />
          <div className="flex flex-col justify-center w-full lg:w-1/2">
            <p className="text-5xl font-bold mb-11">NFT Minter</p>
            {nftMinter}
            <Link href="/mint-nft" passHref>
              <ButtonPill
                text="Mint Now"
                onClick={() => {}}
                className="self-center my-8 hover:scale-105"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap-reverse justify-center py-5 lg:flex-nowrap lg:justify-between">
          <div className="flex flex-col justify-center w-full lg:w-1/2">
            <p className="text-5xl font-bold mb-11">Staking Pool</p>
            {stakingPool}
            <Link href="/coming-soon" passHref>
              <ButtonPill
                text="Stake Now"
                onClick={() => {}}
                className="self-center my-8 hover:scale-105"
              />
            </Link>
          </div>
          <Image
            src={poolParty}
            alt="Pool party"
            height={400}
            width={400}
            className="object-contain"
          />
        </div>
        <p className="text-5xl font-bold text-left mb-11">Meet the Founders</p>
        <div className="flex flex-col pt-5 pb-8">
          <div className="flex flex-wrap justify-around">
            <FounderProfile
              name="ELTON TAY"
              title="CEO"
              imgSrc="/assets/founders/tay.jpg"
              imgAlt="Elton"
              wottleImgSrc="/assets/founders/wottle_ig_tay_2.png"
              wottleImgAlt="Elton Wottle"
            />
            <FounderProfile
              name="KANG LIANG"
              title="CTO"
              imgSrc="/assets/founders/kang.jpg"
              imgAlt="Kang"
              wottleImgSrc="/assets/founders/wottle_ig_kang.png"
              wottleImgAlt="Kang Wottle"
            />
          </div>
          <div className="flex flex-wrap justify-around">
            <FounderProfile
              name="SEAN CHUA"
              title="CDO"
              imgSrc="/assets/founders/sean.jpg"
              imgAlt="Sean"
              wottleImgSrc="/assets/founders/wottle_ig_wota.png"
              wottleImgAlt="Sean Wottle"
            />
            <FounderProfile
              name="LUNDY PANG"
              title="CMO"
              imgSrc="/assets/founders/lundy.jpg"
              imgAlt="Lundy"
              wottleImgSrc="/assets/founders/wottle_ig_lundy.png"
              wottleImgAlt="Lundy Wottle"
            />
          </div>
        </div>
        <div className="flex flex-col items-center pb-5 mb-5">
          <div className="flex justify-center w-full md:w-3/4">
            <Image
              src={roadmap}
              alt="roadmap"
              className="object-contain bg-primary-default"
            />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default About;
