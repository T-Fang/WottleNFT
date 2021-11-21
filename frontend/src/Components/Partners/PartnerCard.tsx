import React from "react";

import Link from "next/link";

import { Partner } from "../../types/Partner";

type Props = {
  partner: Partner;
};

const PartnerCard = ({ partner }: Props) => {
  const { name, imgUrl, websiteUrl } = partner;

  return (
    <Link href={websiteUrl}>
      <a
        target="_blank"
        className="flex flex-col items-center w-full h-full p-2"
      >
        <img
          className="object-contain p-2 h-4/5 rounded-full border-black border-1"
          style={{ borderWidth: 1 }}
          alt={name}
          src={imgUrl}
        />
        <span className="text-2xl truncate mt-3">{name}</span>
      </a>
    </Link>
  );
};

export default PartnerCard;
