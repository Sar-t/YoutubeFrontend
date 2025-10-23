import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const VideoCard = ({ onClick,_id,thumbnail, title, channel, views, time }) => {
  const [likes,setLikes] = useState(0);
  useEffect(()=>{
    //fetch likes count
    axios.get(`/api/v1/like/get/likes/${_id}`)
    .then(res => setLikes(res.data.data.length))
    .catch(err => console.log("an error occured"));
  },[_id]);
  
  return (
    <Link to={`/video/${_id}`}>
    <div className="w-72 cursor-pointer" onClick={onClick}>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="mt-2 flex gap-2">
        <img
          src={`https://ui-avatars.com/api/?name=${channel}`}
          alt={channel}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-gray-600 text-xs">{channel}</p>
          <p className="text-gray-500 text-xs">{views} views • {likes} likes • {time}</p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default VideoCard;
