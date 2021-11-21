import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import PartnerCard from "../Components/Partners/PartnerCard";
import { Main } from "../templates/Main";
import { Partner } from "../types/Partner";
import { testPartners } from "../types/testData";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      partners: testPartners,
    },
  };
};
type Props = {
  partners: Partner[];
};
const Partners = (props: Props) => {
  const { partners } = props;
  const router = useRouter();
  return (
    <Main title="Partners">
      <div className="flex justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover min-w-1200 bg-primary-default bg-background-seascape">
        <div className="z-10 w-2/5 pl-8 pr-2 md:ml-14 2xl:ml-56 my-44 max-w-maxScreen">
          <p className="mb-16 text-4xl font-bold leading-snug break-words sm:break-normal md:text-5xl lg:text-6xl">
            External Partners
          </p>
          <p className="mb-10 text-xl leading-tight lg:text-3xl">
            WottleNFT works with the best partners. We are looking for
            partnerships with Education Institutions, Art Schools, Curators and
            Investors.
            <br />
            <br />
            Interested in collaborating an impact for good? Drop us an email at{" "}
            <b>contact@wottlenft.io</b>
          </p>
        </div>
        <img
          className="z-0 self-end object-contain invisible md:visible w-1/2"
          src={`${router.basePath}/assets/shake-hands.png`}
          alt="all wottles"
        />
      </div>

      <div className="flex flex-col gap-3 px-6 md:px-10 py-10">
        <p className="text-4xl font-bold">OUR PARTNERS</p>
        <p className="text-base">
          Have a look at our current partners. Click on them to read up more!
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
export default Partners;
