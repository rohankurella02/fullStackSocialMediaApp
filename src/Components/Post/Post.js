import React from 'react'
import './Post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import testImg1 from '../../Assets/testImg1.png'
import myPhoto from '../../Assets/myPhoto.png'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Post({d}) {

    const user = useSelector(state => state.user.userObject);
    // const [posts, setPosts] = React.useState([]);
    const [open, setOpen] = React.useState(true);

    // useEffect(() => {
    //     const fetchPosts = axios.get('http://localhost:4000/api/post/get')
    //     .then(res => {setPosts(res.data); console.log(res.data)}).catch(err => console.log(err))
    // }, [posts])

    const likeButton = (id) => {
        const likePost = axios.patch(`/api/post/updateLikeCount/${id}`)
        .then(res => console.log(res)).catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        const deletePost = axios.delete(`/api/post/delete/${id}`)
        // .then(res => alert(res.data.message)).catch(err => console.log(err))
        toast.promise(deletePost, {
            loading: 'Loading',
            success: 'Post Deleted Successfully',
            error: 'Something went wrong , Please try later',
        });


    }

  return (
    <div className='post'>
          <div className="postWrapper">
              <div className="postTop">
                  <div className="postTopLeft">
                      <img src={d.profileImageUrl} alt="" className="postProfileImg" />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                          <div className="postUsername"> {d.profileName} </div>
                          <div style={{ margin: "0 10px" }} className="postDate">5 mins ago</div>
                      </div>
                  </div>
                  <div className="postTopRight">
                      <span onClick={() => handleDelete(d._id)} className='button'><MoreVertIcon /></span>
                  </div>
              </div>
              <div className="postCenter">
                  <div className="postText">{d.message}</div>
                  <img src={d.photoUrl} alt="" className="postImg" />
              </div>
              <div className="postBottom">
                  <div className="postBottomLeft">
                      <span onClick={() => likeButton(d._id)}>
                          <ThumbUpIcon className='postLikeIcon' />
                          <FavoriteIcon className='postLoveIcon' />
                      </span>
                      <span className="postLikeCounter">{d.likeCounter} People Liked</span>
                  </div>
                  <div className="postBottomRight">
                      <span className="postCommentText">{d.commentCounter} comments</span>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Post