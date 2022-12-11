import React from 'react'
import { GoSearch } from 'react-icons/go'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { BsPersonCircle } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import { HiHome } from 'react-icons/hi'
import './Topbar.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../slices/userSlice'

function Topbar() {

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(logOut())
        navigate('/login');
    }

    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <span className="logo">Socials</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <GoSearch className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput" />
                </div>

            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <div className="topbarLink topbarLinkHome"> <HiHome className='homeIcon' /> <span>Home</span></div>
                    <div className="topbarLink">Timeline</div>
                </div>
                <div className='topbarIcons'>
                    <div className="topbarIconItem">
                        <BsFillChatLeftTextFill size={20} className="topbarIcon" />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <IoIosNotifications size={25} className="topbarIcon" />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        {/* <BsPersonCircle size={20} className="topbarIcon" /> */}
                        <div className="signOut">
                            <span onClick={handleSignout}  className="signOutText">Sign Out</span>
                        </div>
                        {/* <span className="topbarIconBadge">1</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar