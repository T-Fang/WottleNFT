import React from "react";

import { IonIcon } from "@ionic/react";
import { copy } from "ionicons/icons";

type Props = {
  label: string;
  text: string;
};

const CopySection = ({ label, text }: Props) => {
  return (
    <section className="w-full my-4">
      <p className="font-bold">{label}</p>
      <pre
        className="flex flex-row justify-between w-full p-4 overflow-auto bg-gray-400 rounded-md hover:cursor-pointer"
        onClick={() => navigator.clipboard.writeText(text)}
      >
        {text} <IonIcon icon={copy} />
      </pre>
    </section>
  );
};

export default CopySection;
