interface Props {
  text: string;
  onClick: () => void;
  className?: string;
}

const ButtonPill = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={`w-48 h-10 bg-primary-default rounded-full shadow-md drop-shadow-md font-semibold ${
        props.className && props.className
      }`}
    >
      {props.text}
    </button>
  );
};
export default ButtonPill;
