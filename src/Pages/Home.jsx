import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero/Hero'
import VideoCard from '../components/VideoCard/VideoCard.jsx'
import axios from "axios"
function Home() {
  const [videos,setVideos] = useState([]);
  //fetch all home feed
  useEffect(()=>{
    axios.get("/api/v1/video/")
    .then((response)=>setVideos(response.data.data.data)) //axios stores response in data object by default
    .catch((error)=>console.log(error));
  },[])
  const handleClick = (videoId)=>{
    console.log("video clicked:",videoId);
    axios.post(`/api/v1/video/view/${videoId}`)
    .then(res => console.log("View recorded:",res.data))
    .catch(err => console.log("Error updating view count:",err));
  }
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard
          onClick = {()=>handleClick(video._id)}
          key={video._id}
          _id={video._id}
          thumbnail={video.thumbnail}
          title={video.title}
          channel={video.owner?.username}
          views={video.views}
          time={new Date(video.createdAt).toLocaleDateString()}
        />
      ))}
    </div>
  )
}

export default Home;
