import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";

export const PostCard = ({ post }) => {
  const { user, accessToken } = useContext(UserContext);
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentsShown, setCommentsShown] = useState(false);
  const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    if (user) {
      const myLike = likes.find((like) => {
        return like.user.username === user.username;
      });
      setLiked(Boolean(myLike));
    }
  }, [user, post]);

  const handleLike = () => {
    setLoading(true);
    if (!liked) {
      axios
        .post(`http://localhost:3001/api/posts/${post._id}/likes`, null, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          setLikes([...likes, res.data]);
          setLiked(true);
          setLoading(false);
        });
    } else {
      axios
        .delete(`http://localhost:3001/api/posts/${post._id}/likes`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then(() => {
          setLikes(
            likes.filter((like) => {
              return like.user.username === user.username;
            })
          );
          setLiked(false);
          setLoading(false);
        });
    }
    setLiked(!liked);
  };

  const handleComment = async (comment) => {
    if (comment.length > 0) {
      setLoading(true);
      axios
        .post(
          `http://localhost:3001/api/posts/${post._id}/comments`,
          {
            comment,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((res) => {
          setComments([
            ...comments,
            {
              ...res.data,
              user: {
                username: user.username,
              },
            },
          ]);
          setLoading(false);
        });
    }
  };

  return (
    <li>
      <div className="flex gap-3 items-center py-[14px] px-4 ">
        <Image
          src={user?.profileURL || "/noImage.png"}
          alt=""
          className="w-8 h-8 rounded-full"
          width={32}
          height={32}
        />
        <Link
          className="text-blue-500 h-[18px] flex items-center text-sm font-bold "
          href={`${post.user.username}`}
        >
          {post.user.username}
        </Link>
      </div>
      <Image
        width={430}
        objectFit="contain"
        height={430}
        src={post.mediaURL}
        alt=""
      />

      <div className="px-4">
        <div className="flex gap-4 py-3">
          <button
            disabled={loading}
            onClick={handleLike}
            className="disabled:opacity-50"
          >
            {liked ? <Image src="/heart.png" width={24} height={24}  alt=""/> : <FaRegHeart size={24} />}
          </button>
          <button>
            <FaRegComment size={24} />
          </button>
        </div>
        {likes.length} Likes{" "}
      </div>
      <div className="flex gap-1 px-4 items-center my-2">
        <Link
          className="text-white h-[18px] flex items-center text-sm font-bold "
          href={`${post.user.username}`}
        >
          @{post.user.username}
        </Link>
        <p>{post.description}</p>
      </div>
      {!commentsShown && (
        <p
          onClick={() => {
            setCommentsShown(true);
          }}
          className="text-[#A8A8A8] px-4 "
        >
          View all {comments.length} comments
        </p>
      )}
      {commentsShown && (
        <>
          <ul>
            {comments.map((comment) => (
              <li className="px-4" key={comment._id}>
                {comment.user.username}: {comment.comment}
              </li>
            ))}
          </ul>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const comment = e.target.comment.value;
              await handleComment(comment);
              e.target.comment.value = "";
            }}
          >
            <input
              type="text"
              className="w-full border-b px-4 bg-background text-foreground"
              placeholder="Add a comment..."
              name="comment"
              disabled={loading}
            />
          </form>
        </>
      )}
    </li>
  );
};
