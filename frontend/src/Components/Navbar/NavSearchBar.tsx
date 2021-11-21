import { useRouter } from "next/router";

const NavSearchBar = () => {
  const router = useRouter();

  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      router.push("/coming-soon");
    }
  };

  return (
    <input
      className="hidden w-full h-12 max-w-lg px-5 transition duration-150 rounded-full shadow-md lg:block drop-shadow-md mx-7 focus:outline-none focus:ring-2"
      type="text"
      placeholder="Search for an NFT"
      onKeyPress={handleEnterKey}
    />
  );
};
export default NavSearchBar;
