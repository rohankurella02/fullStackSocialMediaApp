import React from 'react'
import '../Pages/Home.css'
import Topbar from '../Components/Topbar/Topbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import Rightbar from '../Components/RightBar/Rightbar'
import Feed from '../Components/Feed/Feed'

function Home() {
  return (
    <div>
        <Topbar />
        <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
        </div>
        
    </div>
  )
}

export default Home