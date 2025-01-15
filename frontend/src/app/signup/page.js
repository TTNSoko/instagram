"use client";

import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/user-context";

export default function SignupPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const credential = e.target.credential.value;
          const password = e.target.password.value;
          const fullname = e.target.fullname.value;
          const username = e.target.username.value;
          axios
            .post(`${process.env.NEXT_PUBLIC_API}/signup`, {
              credential,
              password,
              fullname,
              username,
            })
            .then((res) => {
              toast.success("Successfully signed up.");
              router.push("/signin");
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
            type="text"
            className="border border-neutral-600 rounded w-[270px] bg-[#121212] p-2 text-xs "
            placeholder="Phone number or email"
          />
        </label>
        <label className="flex flex-col">
          <input
            name="password"
            type="password"
            className="border border-neutral-600 rounded w-[270px] bg-[#121212] p-2 text-xs "
            placeholder="Password"
          />
        </label>
        <label className="flex flex-col">
          <input
            name="fullname"
            type="text"
            className="border border-neutral-600 rounded w-[270px] bg-[#121212] p-2 text-xs "
            placeholder="Fullname"
          />
        </label>
        <label className="flex flex-col">
          <input
            name="username"
            type="text"
            className="border border-neutral-600 rounded w-[270px] bg-[#121212] p-2 text-xs "
            placeholder="Username"
          />
        </label>
        <button className="text-white font-bold bg-[#0095f6] rounded-lg px-4 py-2 ">
          Signup
        </button>
      </form>
      <div className="my-4 text-[#A8A8A8] text-sm py-4 ">
        Already have an account?{" "}
        <Link href={"/signin"} className="text-[#0095f6] font-bold">
          Sign in
        </Link>
      </div>
    </div>
  );
}
