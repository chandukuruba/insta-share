import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {BiSearchAlt2} from 'react-icons/bi'
import SearchContext from '../../context/SearchContext'
import './index.css'

const Header = props => {
  const [showMenu, setMenu] = useState(false)

  return (
    <SearchContext.Consumer>
      {value => {
        const {searchInput, setIsSearched, setSearchInput} = value

        const onClickLogout = () => {
          const {history} = props
          Cookies.remove('jwt_token')
          history.replace('/login')
        }

        const onClickMenu = () => {
          setMenu(true)
        }

        const onClickShowMenu = () => {
          setMenu(false)
        }

        const onSearch = event => {
          setSearchInput(event.target.value)
        }

        const onClickSearch = () => {
          setIsSearched(prev => {
            const {isReload} = prev
            return {userSearched: true, isReload: !isReload}
          })
        }

        return (
          <nav className="nav-header">
            <div className="nav-content">
              {/* <div className="nav-bar-mobile-logo-container">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dijyby6dt/image/upload/v1695617634/logo_kkwdhk.svg"
                    className="website-logo"
                    alt="website logo"
                  />
                </Link>
                <h1 className="login-head">Insta Share</h1>
                <button type="button" className="nav-mobile-btn">
                  <img
                    src="https://res.cloudinary.com/dijyby6dt/image/upload/v1695821074/k3otn8icm6hhxwispk4y.svg"
                    alt="nav logout"
                    className="nav-bar-image"
                    onClick={onClickMenu}
                  />
                </button>
              </div> */}

              <div className="nav-bar-large-container">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dijyby6dt/image/upload/v1695617634/logo_kkwdhk.svg"
                    className="login-website-logo-desktop-image"
                    alt="website logo"
                  />
                </Link>
                <h1 className="login-head">Insta Share</h1>
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <div className="input-container">
                      <input
                        type="search"
                        className="search-input"
                        onChange={onSearch}
                        value={searchInput}
                      />
                      <button
                        type="button"
                        className="search-icon-container"
                        onClick={onClickSearch}
                      >
                        <BiSearchAlt2 className="search-icon" />
                      </button>
                    </div>
                  </li>
                  <li className="nav-menu-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>

                  <li className="nav-menu-item">
                    <Link to="/my-profile" className="nav-link">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-menu-item">
                    <button
                      type="button"
                      className="logout-desktop-btn"
                      onClick={onClickLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* {showMenu && (
              <div className="nav-menu-mobile">
                <ul className="nav-menu-list-mobile">
                  <li className="nav-menu-item-mobile">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-menu-item-mobile nav-link">Search</li>

                  <li className="nav-menu-item-mobile">
                    <Link to="/my-profile" className="nav-link">
                      profile
                    </Link>
                  </li>
                  <li className="nav-menu-item-mobile">
                    <button
                      type="button"
                      className="logout-desktop-btn"
                      onClick={onClickLogout}
                    >
                      Logout
                    </button>
                  </li>
                  <li onClick={onClickShowMenu}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
                        fill="#262626"
                      />
                    </svg>
                  </li>
                </ul>
              </div>
            )} */}
          </nav>
        )
      }}
    </SearchContext.Consumer>
  )
}

export default withRouter(Header)
