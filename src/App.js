import {Route, Redirect, Switch} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import PopularVideos from './components/PopularVideos'
import MovieDetails from './components/MovieDetails'
import SearchMovie from './components/SearchMovie'
import Context from './Context'
import Account from './components/Account'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    searchInput: '',
    searchedInput: '',
    searchButtonClicked: false,
    searchedButtonClicked: false,
    accountButtonClicked: false,
    userData: {},
  }

  setUserData = data => {
    this.setState({userData: data})
  }

  setSearchInput = value => {
    this.setState({
      searchInput: value,
      //   searchedInput: value,
      searchedButtonClicked: false,
    })
  }

  setSearchedButtonClicked = () => {
    const {searchInput} = this.state
    this.setState({searchedButtonClicked: true, searchedInput: searchInput})
  }

  onAccountButtonClicked = largeDevice => {
    if (largeDevice) {
      this.setState({
        accountButtonClicked: false,
      })
    } else {
      this.setState(prev => ({
        accountButtonClicked: !prev.accountButtonClicked,
      }))
    }
  }

  render() {
    const mobileWidth = window.innerWidth <= 768
    const largeDevice = window.innerWidth >= 768
    const {
      searchInput,
      searchedInput,
      accountButtonClicked,
      searchButtonClicked,
      searchedButtonClicked,
      userData,
    } = this.state
    return (
      <Context.Provider
        value={{
          mobileWidth,
          largeDevice,
          searchInput,
          searchedInput,
          searchButtonClicked,
          searchedButtonClicked,
          accountButtonClicked,
          userData,
          setSearchInput: this.setSearchInput,
          setSearchedButtonClicked: this.setSearchedButtonClicked,
          onAccountButtonClicked: this.onAccountButtonClicked,
          setUserData: this.setUserData,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={PopularVideos} />
          <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
          <ProtectedRoute exact path="/search" component={SearchMovie} />
          <ProtectedRoute exact path="/account" component={Account} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
