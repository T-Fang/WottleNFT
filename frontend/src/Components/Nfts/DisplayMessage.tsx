type Props = {
  text: string;
};

const DisplayMessage = ({ text }: Props) => {
  return <p className="w-full p-4 font-mono text-2xl text-center">{text}</p>;
};

export default DisplayMessage;
