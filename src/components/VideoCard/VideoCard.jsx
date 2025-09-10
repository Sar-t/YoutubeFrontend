import React from "react";

const VideoCard = ({ thumbnail, title, channel, views, time }) => {
  return (
    <div className="w-72 cursor-pointer">
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
          <p className="text-gray-500 text-xs">{views} • {time}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
