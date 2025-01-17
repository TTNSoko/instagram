"use client";

import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/user-context";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function SigninPage() {
  const { user, setAccessToken } = useContext(UserContext);

  if (user) {
    // router.push("/");
    return redirect("/");
    // "buruu huudas ruu newtersen tohioldold";
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen flex-col">
      <Image
        width={175}
        height={51}
        src="/igwrittenlogo.svg"
        className="pt-9 pb-3"
        alt=""
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const credential = e.target.credential.value;
          const password = e.target.password.value;
          axios
            .post(`${process.env.NEXT_PUBLIC_API}/signin`, {
              credential,
              password,
            })
            .then((res) => {
              toast.success("Successfully entered.");
              setAccessToken(res.data.accessToken);
            })
            .catch((err) => {
              console.error(err);
              toast.error(err.response.data.message);
            });
        }}
        className="flex flex-col gap-4 "
      >
        <label className="flex flex-col">
          <input
            name="credential"
            type="string"
            className="border border-neutral-600 rounded w-[270px] bg-[#121212] p-2 text-xs "
            placeholder="Phone number, username, or email"
          />
        </label>
        <label className="flex flex-col">
          <input
            name="password"
            type="password"
            className="border w-[270px] border-neutral-600 rounded bg-[#121212] p-2 text-xs"
            placeholder="Password"
          />
        </label>
        <button className="text-white font-bold bg-[#0095f6] rounded-lg px-4 py-2 ">
          Log In
        </button>
      </form>
      <div className="my-4 text-[#A8A8A8] text-sm py-4">
        Do not have an account?{" "}
        <Link href={"/signup"} className="text-[#0095f6] font-bold">
          Sign up
        </Link>
      </div>
    </div>
  );
}
