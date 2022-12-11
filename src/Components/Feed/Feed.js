import React, { useEffect } from 'react'
import './Feed.css'
import Share from '../Share/Share'
import Post from '../Post/Post'
import axios from 'axios';

function Feed() {

  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const fetchPosts = axios.get('/api/post/get')
      .then(res => { setPosts(res.data); console.log(res.data) }).catch(err => console.log(err))
  }, [posts])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />
        {
          posts.reverse().map((d) => {
            return (
              <Post d={d} />
            )
          })
        }

      </div>
    </div>
  )
}

export default Feed