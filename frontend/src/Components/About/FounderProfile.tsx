interface Props {
  name: string;
  title: string;
  imgSrc: string;
  imgAlt: string;
  wottleImgSrc: string;
  wottleImgAlt: string;
}

const FounderProfile = (props: Props) => {
  return (
    <div>
      <div className="relative rounded-full h-80 w-80 sm:h-96 sm:w-96">
        <img
          src={props.imgSrc}
          alt={props.imgAlt}
          className="object-cover w-full h-full rounded-full"
        />
        <img
          src={props.wottleImgSrc}
          alt={props.wottleImgAlt}
          className="absolute top-0 right-0 w-36 h-36"
        />
      </div>
      <div className="my-5">
        <p className="text-xl font-bold text-center ">{props.name}</p>
        <p className="mt-2 text-xl font-bold text-center">{props.title}</p>
      </div>
    </div>
  );
};
export default FounderProfile;
