"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { IoMdHome, IoMdMail, IoMdPlay, IoMdSearch } from "react-icons/io";
import { UserContext } from "../contexts/user-context";
import { IoExit } from "react-icons/io5";

export const Footer = () => {
  const { user, setAccessToken } = useContext(UserContext);

  const handleSignOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      setAccessToken("");
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full z-10 bg-background border-t p-3 ">
      <div className="flex justify-between items-center max-w-[430px] mx-auto w-full">
        <button onClick={handleSignOut}>
          <IoExit size={24} />
        </button>
        <Link href={"/"}>
          <IoMdHome size={24} />
        </Link>
        <Link href={`/${user?.username}`}>
          <Image
            src={user?.profileURL || "/noImage.png"}
            alt=""
            className="w-6 h-6 rounded-full"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </footer>
  );
};
