import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'

import './index.css'

const ProfileItem = props => {
  const {data} = props

  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    posts,
    stories,
    postsCount,
    storyAlt,
    profileAlt,
    postAlt,
  } = data

  return (
    <>
      <Header />
      <div className="profile-section">
        <div className="profile-section-top">
          <img src={profilePic} alt={profileAlt} className="profile-image" />
          <div>
            <h1 className="user-profile-name">{userName}</h1>
            <div className="basic-info">
              <p className="data">{postsCount} posts</p>
              <p className="data">{followersCount} followers</p>
              <p className="data">{followingCount} following</p>
            </div>
            <p>{userId}</p>
            <p className="profile-bio">{userBio}</p>
          </div>
        </div>
        <ul className="story-container">
          {stories.map(each => (
            <img
              src={each.image}
              key={each.id}
              alt={storyAlt}
              className="stories"
            />
          ))}
        </ul>

        <hr className="line" />
        <div className="posts-icon-container">
          <BsGrid3X3 />
          <h1>Posts</h1>
        </div>
        {postsCount === 0 ? (
          <div>
            <BiCamera className="icon" />
            <h1>No Posts</h1>
          </div>
        ) : (
          <ul className="each-post-container">
            {posts.map(each => (
              <img
                src={each.image}
                key={each.id}
                alt={postAlt}
                className="each-post"
              />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default ProfileItem
