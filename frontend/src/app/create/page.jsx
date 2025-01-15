"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ImageUploader } from "./ImageUploader";
import { UserContext } from "../contexts/user-context";

const CreatePage = () => {
  const { accessToken } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [mediaURL, setMediaURL] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/posts",
        {
          description,
          mediaURL,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      toast.success("Post successfully added.");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the post!");
    }
  };

  return (
    <>
      <header className="flex justify-between p-4">
        <button onClick={() => router.back()}> back </button>
        <p>New Post</p>
        <button onClick={handleSubmit}>Share</button>
      </header>
      <main className="p-4">
        <ImageUploader setMediaURL={setMediaURL} />
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="bg-background text-foreground border w-full rounded resize-none"
        ></textarea>
      </main>
    </>
  );
};

export default CreatePage;
