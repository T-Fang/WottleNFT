import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import PartnerCard from "../Components/Partners/PartnerCard";
import { Main } from "../templates/Main";
import { Partner } from "../types/Partner";
import { testSocialEnterprises } from "../types/testData";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      partners: testSocialEnterprises,
    },
  };
};
type Props = {
  partners: Partner[];
};
const SocialEnterprises = (props: Props) => {
  const { partners } = props;
  const router = useRouter();
  return (
    <Main title="Social Enterprises">
      <div className="flex justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover min-w-1200 bg-primary-default bg-background-seascape">
        <div className="z-10 w-2/5 pl-8 pr-2 md:ml-14 2xl:ml-56 my-44 max-w-maxScreen">
          <p className="mb-16 text-4xl font-bold leading-snug break-words sm:break-normal md:text-5xl lg:text-6xl">
            Social Enterprise Partners
          </p>
          <p className="mb-10 text-xl leading-tight lg:text-3xl">
            WottleNFT is looking for Social Enterprises partnerships to deliver
            a stronger sustainable impact to the people that needs it the most.
            <br />
            <br />
            Follow the instructions{" "}
            <a href="https://github.com/WottleNFT/wottlenft/files/7393352/Beneficiary.Application.pdf">
              <u>
                <b>here</b>
              </u>
            </a>{" "}
            and email us at <b>contact@wottlenft.io</b>
          </p>
        </div>
        <img
          className="z-0 self-end object-contain h-2/6 lg:h-1/2 xl:h-5/6"
          src={`${router.basePath}/assets/everyone-together.png`}
          alt="all wottles"
        />
      </div>

      <div className="flex flex-col gap-3 px-6 md:px-10 py-10">
        <p className="text-4xl font-bold">OUR SOCIAL PARTNERS</p>
        <p className="text-base">
          Each Social Enterprise are driven towards their respective <b>SDG</b>{" "}
          that they support. Click on them to read up more!
        </p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {partners.map((partner, idx) => {
            return (
              <div key={idx}>
                <PartnerCard partner={partner} />
              </div>
            );
          })}
        </div>
      </div>
    </Main>
  );
};
export default SocialEnterprises;
