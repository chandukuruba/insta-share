import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './index.css'

const PostItem = props => {
  const {data} = props
  const {
    postDetails,
    userName,
    profilePic,
    comments,
    createdAt,
    postId,
    likesCount,
    userId,
  } = data
  const [likeObject, setLike] = useState({likes: likesCount, isLiked: false})

  const path = `users/${userId}`

  useEffect(() => {
    const postApi = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'POST',
        body: JSON.stringify({like_status: likeObject.isLiked}),
      }
      await fetch(url, options)
    }

    postApi()
  }, [likeObject, postId])

  const onClickLike = () => {
    setLike(prev => {
      if (prev.isLiked === false) {
        const likes = prev.likes + 1
        return {likes, isLiked: true}
      }
      const likes = prev.likes - 1
      return {likes, isLiked: false}
    })
  }

  return (
    <li className="post-item">
      <div className="profile-container">
        <img src={profilePic} alt={userName} className="user-pic" />
        <Link to={path} className="nav-link">
          <p className="user-name">{userName}</p>
        </Link>
      </div>
      <img src={postDetails.image_url} alt="post" className="post-image" />
      <div className="icon-container">
        <button
          type="button"
          onClick={onClickLike}
          className="transparent-button"
        >
          {likeObject.isLiked ? (
            <FcLike className="icon" />
          ) : (
            <BsHeart className="icon" />
          )}
        </button>
        <FaRegComment className="icon" />
        <BiShareAlt className="icon" />
      </div>
      <p className="user-name">{likeObject.likes} Likes</p>
      <p className="caption">{postDetails.caption}</p>
      {comments.map(each => (
        <p className="caption" key={each.user_id}>
          <span className="user-name">{each.user_name} </span>
          {each.comment}
        </p>
      ))}
      <p className="caption">{createdAt}</p>
    </li>
  )
}

export default PostItem
