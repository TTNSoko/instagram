"use client";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user-context";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./common/Header";
import { Footer } from "./common/Footer";

export default function Home() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  if (!user) {
    return redirect("/signin");
  }
  return (
    <div>
      <Header />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Image
              width={400}
              objectFit="contain"
              height={400}
              src={post.mediaURL}
              alt=""
            />
            {post.description}
            <br />
            <Link className="text-blue-500 " href={`${post.user.username}`}>
              @{post.user.username}
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}
