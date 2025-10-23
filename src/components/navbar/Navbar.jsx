"use client"

import { useState, useEffect } from "react"
import { Search, Menu, Mic, Video, Bell, User } from "lucide-react"
import { useSelector } from "react-redux"
import axios from "axios"
import { Link } from "react-router-dom"

export default function YouTubeNavbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const authStatus = useSelector((state) => state.auth.status)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`/api/v1/users/current-user`)
        setUser(res.data.data)
        console.log("Fetched user:", res.data.data )
      } catch (error) {
        console.error("Failed to fetch user", error)
      }
    }
    console.log("Auth status changed:", authStatus)
    if (authStatus) {
      fetchCurrentUser()
    } else {
      setUser(null)
    }
  }, [authStatus])

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <div className="w-5 h-3 bg-white rounded-sm relative">
              <div className="absolute inset-0 bg-red-600 rounded-sm transform scale-75"></div>
            </div>
          </div>
            <span className="text-xl font-semibold text-gray-900 hidden sm:block">
              YouTube
            </span>
        </div>
        </Link>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 mx-10 hidden md:flex">
        <div className="flex w-full">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-l-full focus:border-blue-500 focus:outline-none h-10"
            />
          </div>
          <button className="special px-6 border border-l-0 rounded-r-full border-gray-300 hover:bg-gray-50 bg-gray-50 transition-colors h-10 flex items-center justify-center">
            <Search className="h-5 w-5" />
          </button>
        </div>
        <button className="special ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors w-10 h-10 flex items-center justify-center">
          <Mic className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile search button */}
      <div className="md:hidden">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:flex">
          <Video className="h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="h-5 " />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Auth section */}
        {user == null ? (
          <Link
            to="/signin"
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
        ) : (
          <div className ="flex flex-shrink-0 ">
            <button className="p-0.5 special hover:bg-gray-100 rounded-full transition-colors">
              <img
                src={user?.avatar || "https://via.placeholder.com/40"}
                alt="avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
            </button>
            <button className="px-2 py-2 upload bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            <Link
              to="/upload-video"
            >
              Upload
            </Link>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
