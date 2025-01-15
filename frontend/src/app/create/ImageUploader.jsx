import { IoImageOutline } from "react-icons/io5";
import { ImSpinner } from "react-icons/im";
import { useState } from "react";
import axios from "axios";

export const ImageUploader = ({ setMediaURL }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  return (
    <div className="w-full aspect-square rounded bg-slate-500 my-4 flex items-center justify-center relative overflow-hidden">
      {!response && <IoImageOutline size={40} />}
      <input
        onChange={(e) => {
          setLoading(true);
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          axios
            .post("http://localhost:3001/api/files", formData)
            .then((res) => {
              setResponse(res.data);
              setLoading(false);
              setMediaURL(res.data.filename);
            });
        }}
        type="file"
        className="absolute left-0 top-0 w-full h-full opacity-0 "
        accept="image/*"
      />
      {loading && (
        <div className="w-full h-full rounded bg-black/80 my-4 flex items-center justify-center absolute">
          <ImSpinner className="spin" size={40} />
        </div>
      )}
      {response && (
        <img
          src={response.filename}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};
