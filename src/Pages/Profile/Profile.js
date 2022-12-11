import React from 'react'
import './Profile.css'
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Rightbar from '../../Components/RightBar/Rightbar'
import Feed from '../../Components/Feed/Feed'
import myPhoto from '../../Assets/myPhoto.png'
import coverImg from '../../Assets/coverImg.jpeg'

function Profile() {
  return (
    <div>
        <Topbar />
        <div className="profile">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                          <img src={coverImg} alt="" className="profileCoverImg" />
                          <img src={myPhoto} alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">Rohan Kurella</h4>
                    <span className="profileInfoDesc">Hey There !</span>
                </div>
                
            </div>
            <div className="profileRightBottom">
                      <Feed />
                      <Rightbar /> 
            </div>
        </div>
        </div>
    </div>
  )
}

export default Profile