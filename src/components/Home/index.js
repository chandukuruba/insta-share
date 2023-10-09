import Cookies from 'js-cookie'
import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import SearchContext from '../../context/SearchContext'
import Header from '../Header'
import PostItem from '../PostItem'

import './index.css'

const Home = () => {
  const [apiResponse, setApiResponse] = useState({
    progress: 'INITIAL',
    data: [],
  })

  const [search, setSearch] = useState('')

  const [searchButtonIsClicked, setSearchButton] = useState(false)

  const [searchResponse, setSearchResponse] = useState({
    progress: 'INITIAL',
    data: [],
  })

  const [apiPostResponse, setApiPostResponse] = useState({
    progress: 'INITIAL',
    data: [],
  })

  const [reload, setReload] = useState(false)

  useEffect(() => {
    setApiResponse(prev => ({...prev, progress: 'LOADING'}))
    const getData = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = 'https://apis.ccbp.in/insta-share/stories'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const filteredData = data.users_stories.map(each => ({
          userName: each.user_name,
          userId: each.user_id,
          storyUrl: each.story_url,
        }))
        setApiResponse(prev => ({
          ...prev,
          progress: 'DONE',
          data: filteredData,
        }))
      } else {
        setApiResponse(prev => ({...prev, progress: 'FAIL'}))
      }
    }

    getData()
  }, [])

  useEffect(() => {
    setApiPostResponse({progress: 'LOADING', data: []})
    const getData = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = 'https://apis.ccbp.in/insta-share/posts'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const filteredData = data.posts.map(each => ({
          postId: each.post_id,
          userId: each.user_id,
          userName: each.user_name,
          profilePic: each.profile_pic,
          postDetails: each.post_details,
          likesCount: each.likes_count,
          comments: each.comments,
          createdAt: each.created_at,
        }))
        setApiPostResponse({progress: 'DONE', data: filteredData})
      } else {
        setApiPostResponse({progress: 'FAIL', data: []})
      }
    }
    getData()
  }, [])

  useEffect(() => {
    setSearchResponse({progress: 'LOADING', data: []})
    const getData = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/insta-share/posts?search=${search}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const filteredData = data.posts.map(each => ({
          postId: each.post_id,
          userId: each.user_id,
          userName: each.user_name,
          profilePic: each.profile_pic,
          postDetails: each.post_details,
          likesCount: each.likes_count,
          comments: each.comments,
          createdAt: each.created_at,
        }))
        setSearchResponse({progress: 'DONE', data: filteredData})
      } else {
        setSearchResponse({progress: 'FAIL', data: []})
      }
    }
    getData()
  }, [searchButtonIsClicked])

  return (
    <SearchContext.Consumer>
      {value => {
        const {searchInput, isSearched} = value

        const onReload = () => {
          setReload(true)
        }

        setSearch(searchInput)

        setSearchButton(isSearched.isReload)

        const renderSuccessView = () => {
          const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 3,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 2,
                },
              },
            ],
          }
          const {data} = apiResponse
          return (
            <Slider {...settings}>
              {data.map(each => (
                <div key={each.userId} className="slick-item">
                  <img
                    className="story-image"
                    src={each.storyUrl}
                    alt={each.userName}
                  />
                  <p className="story-name">{each.userName}</p>
                </div>
              ))}
            </Slider>
          )
        }

        const renderLoadingView = () => (
          <div className="loader-container" testId="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )

        const renderPostsSuccessView = () => {
          const {data} = apiPostResponse
          return (
            <ul className="posts-container">
              {data.map(each => (
                <PostItem key={each.postId} data={each} />
              ))}
            </ul>
          )
        }

        const renderFailureView = () => (
          <>
            <Header />
            <div className="failure-view-container">
              <img
                className="failure-view-img"
                src="https://res.cloudinary.com/dziwdneks/image/upload/v1675775097/alert-triangle_cyhzqu.png"
                alt="failure view"
              />
              <p className="failure-view-heading">
                Something went wrong. Please try again
              </p>
              <button
                type="button"
                className="failure-view--button"
                onClick={onReload}
              >
                Try again
              </button>
            </div>
          </>
        )

        const renderStories = () => {
          const {progress} = apiResponse
          switch (progress) {
            case 'LOADING':
              return renderLoadingView()
            case 'DONE':
              return (
                <div className="main-container">
                  <div className="slick-container">{renderSuccessView()}</div>
                </div>
              )
            default:
              return null
          }
        }

        const renderPosts = () => {
          const {progress} = apiPostResponse
          switch (progress) {
            case 'LOADING':
              return renderLoadingView()
            case 'DONE':
              return renderPostsSuccessView()
            case 'FAIL':
              return renderFailureView()
            default:
              return null
          }
        }

        const renderSearchSuccessView = () => {
          const {data} = searchResponse
          return (
            <ul className="posts-container">
              {data.length >= 1 ? (
                data.map(each => <PostItem key={each.postId} data={each} />)
              ) : (
                <div className="failure-view-container">
                  <img
                    src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
                    alt="failure view"
                    className="failure-view-image"
                  />
                  <h1 className="failure-view-heading">Search Not Found</h1>
                  <p>Try different keyword or search again</p>
                </div>
              )}
            </ul>
          )
        }

        const renderSearchResult = () => {
          const {progress} = searchResponse

          switch (progress) {
            case 'LOADING':
              return renderLoadingView()
            case 'FAIL':
              return renderFailureView()
            case 'DONE':
              return renderSearchSuccessView()
            default:
              return null
          }
        }

        return (
          <>
            <Header />
            {searchInput.length >= 1 && isSearched.userSearched ? (
              <div className="home-container">{renderSearchResult()}</div>
            ) : (
              <div className="home-container">
                {renderStories()}
                {renderPosts()}
              </div>
            )}
          </>
        )
      }}
    </SearchContext.Consumer>
  )
}

export default Home
