/* eslint-disable react/no-unknown-property */

import {Link, withRouter} from 'react-router-dom'
import './index.css'
import {useContext} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import Context from '../../Context'

const Header = props => {
  const {match, history} = props
  const {url} = match
  const context = useContext(Context)
  const {
    searchedInput,
    largeDevice,
    searchInput,
    setSearchInput,
    setSearchedButtonClicked,
    accountButtonClicked,
    onAccountButtonClicked,
    // setSearchButtonClicked,
    // setSearchButtonClickedToFalse,
  } = context
  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onEnterPressed = event => {
    if (event.key === 'Enter' && searchInput !== '') {
      setSearchedButtonClicked()
    }
  }

  const searchButtonClickedStatus = () => {
    setSearchInput('')
  }

  const onSearched = () => {
    setSearchedButtonClicked()
  }
  const onNavBarButtonClicked = () => {
    onAccountButtonClicked(largeDevice)
  }
  const onAccountClicked = () => {
    history.push('/account')
  }

  return (
    <>
      <nav className="nav-bar">
        <div className="mobile-website-container">
          <Link to="/" className="link-element">
            <img
              className="website-image"
              src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1699166748/Movies%20App/Login%20Page/Movies_website_Icon_rojwca.png"
              alt="website logo"
            />
          </Link>
          <ul className="routes-list">
            <li className="navbar-nav">
              <Link to="/" className="link-element display-sm-none route">
                Home
              </Link>
            </li>
            <li className="navbar-nav">
              <Link
                to="/popular"
                className="link-element display-sm-none route"
              >
                Popular
              </Link>
            </li>
          </ul>
        </div>
        <div className="icons-container">
          {url === '/search' ? (
            <div className="input-container">
              <input
                type="search"
                value={searchInput}
                className="search-input"
                onChange={onChangeSearchInput}
                onSubmit={onChangeSearchInput}
                onKeyDown={onEnterPressed}
              />
              <button
                className="search-button2"
                type="button"
                onClick={onSearched}
                testid="searchButton"
              >
                <HiOutlineSearch className="search-icon-img2" color="white" />
              </button>
            </div>
          ) : (
            <Link to="/search">
              <button
                className="search-button"
                type="button"
                onClick={searchButtonClickedStatus}
                testid="searchButton"
              >
                <HiOutlineSearch className="search-icon-img" color="white" />
              </button>
            </Link>
          )}
          <button
            className="search-button"
            type="button"
            onClick={onNavBarButtonClicked}
          >
            <img
              className="search-icon"
              src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1699178526/Movies%20App/Login%20Page/add-to-queue_icon_fdwnek.svg"
              alt="search"
            />
          </button>
          <button
            className="search-button"
            type="button"
            onClick={onAccountClicked}
          >
            <img
              className="avatar"
              src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1699258168/Movies%20App/Login%20Page/Avatar_hylihr.png"
              alt="profile"
            />
          </button>
        </div>
      </nav>
      {accountButtonClicked && (
        <div className="mobile-nav-bar">
          <ul className="mobile-nav-bar-list" onClick={onNavBarButtonClicked}>
            <li className="mobile-nav-bar-list-item">
              <Link className="mobile-nav-bar-list-link" to="/">
                Home
              </Link>
            </li>
            <li className="mobile-nav-bar-list-item">
              <Link className="mobile-nav-bar-list-link" to="/popular">
                Popular
              </Link>
            </li>
            <li className="mobile-nav-bar-list-item">
              <Link className="mobile-nav-bar-list-link" to="/account">
                Account
              </Link>
            </li>
          </ul>
          <button
            className="close-button-mobile-button"
            type="button"
            onClick={onAccountButtonClicked}
          >
            <AiOutlineCloseCircle className="close-img" />
          </button>
        </div>
      )}
    </>
  )
}

export default withRouter(Header)
