import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between p-4 fixed top-0 left-0 right-0 bg-background border-b">
      <Link href={"/"}>Instagram</Link>
      <Link href={"/create"}>+</Link>
    </header>
  );
};
