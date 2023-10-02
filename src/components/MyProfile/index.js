import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProfileItem from '../ProfileItem'
import Header from '../Header'
import './index.css'

const MyProfile = () => {
  const [profileObject, setProfileObject] = useState({
    progress: 'INITIAL',
    data: {},
  })

  const [reload, setReload] = useState(false)

  useEffect(() => {
    setProfileObject({progress: 'LOADING', data: {}})
    const getData = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/insta-share/my-profile`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const filteredData = {
          id: data.profile.id,
          userId: data.profile.user_id,
          userName: data.profile.user_name,
          profilePic: data.profile.profile_pic,
          followersCount: data.profile.followers_count,
          followingCount: data.profile.following_count,
          userBio: data.profile.user_bio,
          posts: data.profile.posts,
          postsCount: data.profile.posts_count,
          stories: data.profile.stories,
          profileAlt: 'my profile',
          storyAlt: 'my story',
          postAlt: 'my post',
        }
        setProfileObject({progress: 'DONE', data: filteredData})
      } else {
        setProfileObject({progress: 'FAIL', data: {}})
      }
    }

    getData()
  }, [reload])

  const onReload = () => {
    setReload(true)
  }

  const renderLoadingView = () => (
    <div className="loader-container" testId="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const successView = () => {
    const {data} = profileObject
    return <ProfileItem data={data} />
  }

  const failureView = () => (
    <>
      <Header />
      <div className="failure-view-container">
        <img
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
          alt="failure view"
          className="failure-view-image"
        />
        <p className="failure-view-heading">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="failure-view-retry-button"
          onClick={onReload}
        >
          Try again
        </button>
      </div>
    </>
  )

  switch (profileObject.progress) {
    case 'LOADING':
      return renderLoadingView()
    case 'DONE':
      return successView()
    case 'FAIL':
      return failureView()
    default:
      return null
  }
}

export default MyProfile
