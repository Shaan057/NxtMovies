/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */

import './index.css'
import {useState, useEffect, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ContactUs from '../ContactUs'
import Header from '../Header'
import Context from '../../Context'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SearchMovie = () => {
  const context = useContext(Context)

  const {
    searchedInput,
    searchedButtonClicked,
    setSearchInput,
    searchButtonClicked,
  } = context
  const [moviesList, setMoviesList] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getPascalCaseData = data => ({
    backdropPath: data.backdrop_path,
    id: data.id,
    posterPath: data.poster_path,
    title: data.title,
  })
  if (searchButtonClicked) {
    setMoviesList(null)
  }
  const fetchData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    if (searchedInput === '') {
      setMoviesList(null)
      setApiStatus(apiStatusConstants.failure)
      return
    }

    try {
      const jwtToken = Cookies.get('jwt_token')
      const Url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchedInput}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(Url, options)
      const {results} = await response.json()
      const formattedData = results.map(each => getPascalCaseData(each))
      if (formattedData.length === 0) {
        setMoviesList([])
        setApiStatus(apiStatusConstants.failure)
      } else {
        setMoviesList(formattedData)
        setApiStatus(apiStatusConstants.success)
      }
    } catch (e) {
      setMoviesList(null)
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    if (searchedInput !== '' && searchedButtonClicked) {
      fetchData()
    }
  }, [searchedInput])

  const tryAgainClicked = () => {
    setSearchInput('')
    setMoviesList(null)
    fetchData()
  }

  const renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )
  // eslint-disable-next-line no-unused-vars
  const renderVideosView = () => (
    <ul className="search-movies-list">
      {moviesList.map(each => (
        <li className="search-list-item test" key={each.id}>
          <Link to={`movies/${each.id}`}>
            <img
              className="movie-thumbnail"
              src={each.backdropPath}
              //   posterPath
              // backdropPath
              alt={each.title}
            />
          </Link>
        </li>
      ))}
    </ul>
  )

  const somethingWentWrong = () => (
    <div className="something-went-wrong-container">
      <img
        className="something-went-wrong-img"
        src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1699688710/Movies%20App/Login%20Page/Background-Complete_ujkzsf.png"
        alt="failure view"
      />
      <p className="try-again-msg">Something went wrong. Please try again</p>
      <button
        className="try-again-button"
        type="button"
        onClick={tryAgainClicked}
      >
        Try Again
      </button>
    </div>
  )

  const renderFailureView = () =>
    moviesList === null ? (
      somethingWentWrong()
    ) : (
      <div className="search-movies">
        <img
          className="movie-not-found-img"
          src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1699619909/Movies%20App/Login%20Page/search-not-foud-view_c1jkzb.png"
          alt="no movies"
        />
        <p className="not-found-text">
          Your search for {searchedInput} did not find any matches.
        </p>
      </div>
    )

  const renderVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="popular-bg-container">
      <Header />
      {renderVideos()}
      <ContactUs />
    </div>
  )
}
// css from popularVideos Route

export default withRouter(SearchMovie)
