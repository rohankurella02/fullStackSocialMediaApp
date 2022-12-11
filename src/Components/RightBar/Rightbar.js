import React from 'react'
import './Rightbar.css'
import SettingsIcon from '@mui/icons-material/Settings';
import myPhoto from '../../Assets/myPhoto.png'
import io from 'socket.io-client';
import Chat from '../Chat/Chat';
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '../../slices/userSlice';

const socket = io.connect('http://localhost:3001');


function Rightbar() {

  const [chat, setChat] = React.useState(false);
  const d = useSelector(state => state.user);
  console.log({user: d.userObject.name})

  const joinRoom = () => {
    socket.emit("join_room", "room");
  };

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        <div className="trending">
          <div className="trendingContainer">
            <div className="trendingTopLeft"> Trend for you</div>
            <div className="trendingTopRight">
              <SettingsIcon />
            </div>
          </div>
          <div className='trendingHeading'>Trending in India</div>
          <div className="trends">
            <div className="trendingItem">
              <div className="trendingItemText">#Minions</div>
              <div className="trendingItemNumber">1.2k Tags</div>
            </div>
            <div className="trendingItem">
              <div className="trendingItemText">#iPhone14Pro</div>
              <div className="trendingItemNumber">154.2k Tags</div>
            </div>
            <div className="trendingItem">
              <div className="trendingItemText">#Minions</div>
              <div className="trendingItemNumber">1.2k Tags</div>
            </div>
            <div className="trendingItem">
              <div className="trendingItemText">#iPhone14Pro</div>
              <div className="trendingItemNumber">154.2k Tags</div>
            </div>
            <div className="trendingItem">
              <div className="trendingItemText">#Minions</div>
              <div className="trendingItemNumber">1.2k Tags</div>
            </div>
            <div className="trendingItem">
              <div className="trendingItemText">#iPhone14Pro</div>
              <div className="trendingItemNumber">154.2k Tags</div>
            </div>
          </div>
        </div>
        { chat===false ? 
        <div className="onlineFriendsContainer">
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            <li onClick={() => {setChat(true); joinRoom()}} className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">L Dhanush</span>
            </li>
            <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">K Uday Kiran</span>
            </li>
            <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img src="https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">P Satyankar</span>
            </li>
            <li className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img src="https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">P R K Vasista</span>
            </li>
          </ul>
        </div> : 
          <div className="onlineeFriendsContainer">
            <Chat setChat={setChat} chat={chat} socket={socket} username={d.userObject.name} room={"room"} />
          </div>
        }

      </div>
    </div>
  )
}

export default Rightbar