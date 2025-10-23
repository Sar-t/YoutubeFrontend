import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import axios from "axios";

export default function LikeDislikeButton({videoId}) {
  const [reaction, setReaction] = useState(null); // "like" | "dislike" | null
  
  useEffect(()=>{
    //fetch initial reaction state from server
    axios.get(`/api/v1/like/get/userlike/${videoId}`)
    .then(res => res.data.data? setReaction("like"): setReaction(null))
    .catch(err => console.log("an error occured"));

    if(reaction === null){
        axios.get(`/api/v1/dislike/get/userdislike/${videoId}`)
        .then(res => res.data.data? setReaction("dislike"): setReaction(null))
        .catch(err => console.log("an error occured"));
    }
  },[videoId])
  

  const handleLike = () => {
    if (reaction === "like"){
        setReaction(null);
        console.log("video like removed!");
    }
    else{
        setReaction("like");
        console.log("video liked!");
    }

    axios.post(`/api/v1/like/toggle/video/${videoId}`)
    .then(res => console.log("video like toggled!"))
    .catch(err => console.log("an error occured"));
  };

  const handleDislike = () => {
    if (reaction === "dislike") {
        setReaction(null);
        console.log("video dislike removed!");
    }
    else {
        setReaction("dislike");
        console.log("video disliked!");
    }
    axios.post(`/api/v1/dislike/toggle/video/${videoId}`)
    .then(res => console.log("video dislike toggled!"))
    .catch(err => console.log("an error occured"));
  };

  return (
    <div className="flex items-center gap-4">
      {/* LIKE button */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${
          reaction === "like"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
      >
        <ThumbsUp
          size={20}
          fill={reaction === "like" ? "white" : "none"}
          strokeWidth={2}
        />
      </button>

      {/* DISLIKE button */}
      <button
        onClick={handleDislike}
        className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${
          reaction === "dislike"
            ? "bg-red-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
      >
        <ThumbsDown
          size={20}
          fill={reaction === "dislike" ? "white" : "none"}
          strokeWidth={2}
        />
      </button>
    </div>
  );
}
