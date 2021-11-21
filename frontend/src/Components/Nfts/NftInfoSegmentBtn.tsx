import { IonSegmentButton } from "@ionic/react";

interface Props {
  value: string;
  selected: string;
  children?: React.ReactNode;
}

function NftInfoSegmentBtn({ value, selected, children }: Props) {
  return (
    <IonSegmentButton
      className={`rounded-segment-button ${
        selected === value && "text-primary-default"
      }`}
      value={value}
    >
      <>{children}</>
    </IonSegmentButton>
  );
}

export default NftInfoSegmentBtn;
