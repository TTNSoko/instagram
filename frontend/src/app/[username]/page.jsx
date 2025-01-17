"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const Page = () => {
  const { username, accessToken } = useParams();
  const { user: currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/api/users/" + username).then((res) => {
      setUser(res.data);
    });
  }, [username]);

  useEffect(() => {
    if (user !== null) {
      axios
        .get("http://localhost:3001/api/posts/user/" + user._id)
        .then((res) => {
          setPosts(res.data);
        })
        .catch(() => {
          setPosts([]);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && currentUser) {
      const result = user.followers.some((follower) => {
        return follower.follower === currentUser._id;
      });
      setIsFollowed(result);
    }
  }, [user, currentUser]);

  const handleFollow = () => {
    axios
      .post(
        "http://localhost:3001/api/users/follow",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsFollowed(res.data.followed);
        toast.success(res.data.message);
      });
  };

  if (!user) return null;

  const isOwner = currentUser._id === user._id;

  return (
    <main>
      <header className="flex justify-between items-center p-4">
        <Link href={"/"}>
          <IoIosArrowBack />
        </Link>
        <h1 className="text-xl font-normal gap-4">{user.username}</h1>
        <Link href={"/create"}>
          <Image src="/plus.png" width={24} height={24} alt="" />
        </Link>
      </header>
      <div className="p-4">
        <div className="flex gap-4">
          <div>
            <Image
              alt=""
              src={user.profileUrl}
              width={77}
              height={77}
              className="border w-[77px] h-[77px] rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl mb-3 font-normal flex gap-4">
              {user.username}
            </h1>
            {!isOwner && (
              <button
                className="text-white bg-[#0095f6] font-semibold rounded-lg px-6 py-[7px] "
                onClick={handleFollow}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            )}
            {isOwner && (
              <div>
                <button className="text-white bg-[#363636] font-semibold rounded-lg px-6 py-[7px]">
                  Edit profile
                </button>
              </div>
            )}
            <div>{user.bio}</div>
          </div>
        </div>
        <div className="text-[#F5F5F5] font-semibold text-sm mt-6 mb-4">
          {user.fullname}
        </div>
      </div>
      <div className="gap-4 py-3 border-[#565656] border-t border-b ">
        <div className="flex justify-around text-[#F5F5F5] font-semibold text-sm ">
          <div>{user.posts.length}</div>
          <div>{user.followers.length}</div>
          <div>{user.followings.length}</div>
        </div>

        <div className="flex justify-around text-[14px] text-[#A8A8A8]">
          <p className="w-[60px] text-center">Posts</p>
          <p className="w-[60px] text-center">Followers</p>
          <p className="w-[60px] text-center">Followings</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <div key={post._id}>
            <Image
              src={post.mediaURL}
              alt={post.description}
              width={300}
              height={300}
              objectFit="cover"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
};
export default Page;
