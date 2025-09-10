"use client"

import { useState } from "react"
import { Search, Menu, Mic, Video, Bell, User } from "lucide-react"

export default function YouTubeNavbar() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <div className="w-5 h-3 bg-white rounded-sm relative">
              <div className="absolute inset-0 bg-red-600 rounded-sm transform scale-75"></div>
            </div>
          </div>
          <span className="text-xl font-semibold text-gray-900 hidden sm:block">YouTube</span>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
        <div className="flex w-full">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-l-full focus:border-blue-500 focus:outline-none h-10"
            />
          </div>
          <button className="px-6 border border-l-0 rounded-r-full border-gray-300 hover:bg-gray-50 bg-gray-50 transition-colors h-10 flex items-center justify-center">
            <Search className="h-5 w-5" />
          </button>
        </div>
        <button className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors w-10 h-10 flex items-center justify-center">
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
          <Video className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </button>
      </div>
    </nav>
  )
}
