import React from 'react'
import './Share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { MdAddPhotoAlternate } from 'react-icons/md';
import LabelIcon from '@mui/icons-material/Label';
import { CgPentagonRight } from 'react-icons/cg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { MdAddReaction } from 'react-icons/md';
import myPhoto from'../../Assets/myPhoto.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useEffect } from 'react';


function Share() {

    const user = useSelector(state => state.user.userObject);
    const [msg, setMsg] = React.useState('');
    const [post, setPost] = React.useState({
        profileImageUrl: user.profileImageUrl,
        profileName: user.name,
        message: null,
        photoUrl: null,
        likeCounter: 0,
        commentCounter: 0,
    });
    useEffect(() => {
        console.log({msg})
    }, [msg])

    const submitPost = () => {
        let newPost = {
            profileImageUrl: user.profileImageUrl,
            profileName: user.name,
            message: msg,
            photoUrl: null,
            likeCounter: 0,
            commentCounter: 0,
        }
        setPost(newPost);
        console.log(post);
        const createPost = axios.post('/api/post/create', newPost)
        .then(res => alert(res.data.message)).catch(err => console.log(err))
    }

  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profileImageUrl} alt="" className="shareProfileImg" />
                <input onChange={(e) => setMsg(e.target.value)} placeholder="What's in your mind" type="text" className="shareInput" />
            </div>
            {/* <hr className="shareHr" /> */}
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <MdAddPhotoAlternate size={20}  className='shareIconPhoto' />
                          {/* <input type="file" name="file-input"
                              id="file-input"
                              class="file-input__input" /> */}
                        <span className="shareOptionText">Photo</span>
                        
                    </div>
                      <div className="shareOption">
                          <CgPentagonRight size={30} className='shareIconTag' />
                          <span className="shareOptionText">Tag</span>
                      </div>
                      <div className="shareOption">
                          <MdAddReaction size={18} className='shareIconFeelings' />
                          <span className="shareOptionText">Feelings</span>
                      </div>
                </div>
                <button onClick={submitPost} className="shareButton">Share</button>
            </div>
        </div>
    </div>
  )
}

export default Share