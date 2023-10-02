import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProfileItem from '../ProfileItem'
import Header from '../Header'
import './index.css'

const UserProfile = props => {
  const [profileObject, setProfileObject] = useState({
    progress: 'INITIAL',
    data: [],
  })

  const [reload, setReload] = useState(false)

  useEffect(() => {
    setProfileObject({progress: 'LOADING', data: {}})
    const getData = async () => {
      const {match} = props
      const {params} = match
      const {id} = params
      console.log(id)
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/insta-share/users/${id}`
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
          id: data.user_details.id,
          userId: data.user_details.user_id,
          userName: data.user_details.user_name,
          profilePic: data.user_details.profile_pic,
          followersCount: data.user_details.followers_count,
          followingCount: data.user_details.following_count,
          userBio: data.user_details.user_bio,
          posts: data.user_details.posts,
          postsCount: data.user_details.posts_count,
          stories: data.user_details.stories,
          profileAlt: 'user profile',
          storyAlt: 'user story',
          postAlt: 'user post',
        }
        setProfileObject({progress: 'DONE', data: filteredData})
      } else {
        setProfileObject({progress: 'FAIL', data: {}})
      }
    }

    getData()
  }, [props, reload])

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

export default UserProfile
