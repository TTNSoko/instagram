import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export const Header = () => {
  return (
    <header className="py-3 px-4 fixed top-0 left-0 right-0 bg-background border-[#565656] border-b">
      <div className="flex justify-between items-center max-w-[430px] mx-auto w-full">
        <Link href={"/"}>
          <Image src="/igwrittenlogo.svg" width={103} height={29} alt="" />
        </Link>
        <Link href={"/create"}>
          <Image src="/plus.png" width={24} height={24} alt="" />
        </Link>
      </div>
    </header>
  );
};
