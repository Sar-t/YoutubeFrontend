import React, { useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import axios from "axios"
function Home() {
  const [videos,setVideos] = useEffect([]);

  //fetch all home feed
  useEffect(()=>{
    const fetchVideos = async ()=>{
      try {
        const res = await axios.get("localhost:8000/api/v1/video/");
      } catch (error) {
        
      }
    }
  },[])

  return (
    <div>
      
    </div>
  )
}

export default Home;
