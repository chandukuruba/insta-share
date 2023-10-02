import {Route, Switch, Redirect} from 'react-router-dom'
import {useState} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import SearchContext from './context/SearchContext'
import './App.css'

const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [isSearched, setIsSearched] = useState({
    userSearched: false,
    isReload: false,
  })

  return (
    <SearchContext.Provider
      value={{searchInput, isSearched, setIsSearched, setSearchInput}}
    >
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        <ProtectedRoute exact path="/my-profile" component={MyProfile} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </SearchContext.Provider>
  )
}

export default App
