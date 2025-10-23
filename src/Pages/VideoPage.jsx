import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import LikeDislikeButton from '../components/LikeButton/LikeButton';
function VideoPage() {
    const {videoId} = useParams();
    const [video,setVideo] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
      const fetchVideo = async()=>{
        console.log("Fetching video with ID:", videoId);
        try {
          const res = await axios.get(`/api/v1/video/id/${videoId}`);
          setVideo(res.data.data);
          console.log("video data:",res.data.data);
        } catch (error) {
          throw error;
          
        }finally {
        setLoading(false);
      }
    }
    fetchVideo();
    },[videoId])
    if (loading) return <p>Loading...</p>;
    if (!video) return <p>Video not found</p>;
  return (
    <div className="p-4 flex flex-col items-center">
      <video
        src={video.videoFile}
        controls
        className="w-full max-w-3xl rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
      <p className="text-gray-700 mt-2">{video.description}</p>
      <p className="text-gray-500 mt-1">
        {video.views} views • Uploaded by {video.owner.username}
      </p>
      <LikeDislikeButton videoId={videoId} />
    </div>
  )
}


export default VideoPage
