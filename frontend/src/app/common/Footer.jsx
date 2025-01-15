"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { IoMdHome, IoMdMail, IoMdPlay, IoMdSearch } from "react-icons/io";
import { UserContext } from "../contexts/user-context";

export const Footer = () => {
  const { user } = useContext(UserContext);

  return (
    <footer className="fixed bottom-0 left-0 w-full z-10 bg-background border-t p-4 flex justify-between">
      <Link href={"/"}>
        <IoMdHome size={20} />
      </Link>
      <Link href={"/"}>
        <IoMdSearch size={20} />
      </Link>
      <Link href={"/"}>
        <IoMdPlay size={20} />
      </Link>
      <Link href={"/"}>
        <IoMdMail size={20} />
      </Link>
      <Link href={`/${user?.username}`}>
        <Image
          src={user?.profileURL || "/noImage.png"}
          alt=""
          className="w-5 h-5 rounded-full"
          width={20}
          height={20}
        />
      </Link>
    </footer>
  );
};
