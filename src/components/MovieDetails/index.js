/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable react/no-unknown-property */

import './index.css'
import {useState, useEffect, useContext} from 'react'
import {intervalToDuration, format} from 'date-fns'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'
// import {GoChevronLeft, GoChevronRight} from 'react-icons/go'
import Header from '../Header'
import ContactUs from '../ContactUs'
import Context from '../../Context'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const style1 = {position: 'relative', top: -50}

const MovieDetails = props => {
  const context = useContext(Context)
  const {accountButtonClicked} = context
  const {match} = props
  const {params} = match
  const {id} = params

  const [movieDetailsList, setMovieDetailsList] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [paginationData, setPaginationData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [prevItems, setPrevItems] = useState(0)
  const [nextItems, setNextItems] = useState(20)

  const getPascalCaseData = data => ({
    backdropPath: data.backdrop_path,
    id: data.id,
    adult: data.adult,
    budget: data.budget,
    genres: data.genres,
    posterPath: data.poster_path,
    title: data.title,
    releaseDate: data.release_date,
    runtime: data.runtime,
    similarMovies: data.similar_movies.map(each => ({
      backdropPath: each.backdrop_path,
      posterPath: each.poster_path,
      title: each.title,
      id: each.id,
    })),
    spokenLanguages: data.spoken_languages.map(each => ({
      englishName: each.english_name,
      id: each.id,
    })),
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    overview: data.overview,
  })
  const fetchData = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    try {
      const jwtToken = Cookies.get('jwt_token')
      const movieUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(movieUrl, options)
      const results = await response.json()
      const formattedData = getPascalCaseData(results.movie_details)
      setMovieDetailsList(formattedData)

      setPaginationData(formattedData.similarMovies.slice(prevItems, nextItems))
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    fetchData()
  }, [id])

  const onPreviousButtonClicked = () => {
    const {similarMovies} = movieDetailsList

    if (pageNo > 1) {
      let prevn = prevItems - 20
      let nextn = nextItems - 20

      setPageNo(pageNo - 1)
      setPrevItems(prevItems - 20)
      setNextItems(nextItems - 20)
      setPaginationData(similarMovies.slice(prevn, nextn))
    }
  }
  const onNextButtonClicked = () => {
    const {similarMovies} = movieDetailsList
    const nextPages = similarMovies.slice(prevItems + 20, nextItems + 20)
    if (nextPages.length > 0) {
      let prevn = prevItems + 20
      let nextn = nextItems + 20

      setPageNo(pageNo + 1)
      setPrevItems(prevItems + 20)
      setNextItems(nextItems + 20)
      setPaginationData(similarMovies.slice(prevn, nextn))
    }
  }

  const getDate = date => {
    const newDate = new Date(date)
    const formattedDate = format(newDate, 'do MMMM yyyy')
    return formattedDate
  }

  const renderLoadingView = () => (
    <div className="movies-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )
  const moviesDetails = () => {
    const style = {backgroundColor: 'black'}
    let adult
    let overview
    let title
    let posterPath
    let backdropPath
    let runtime
    let formattedTime
    let releaseDate
    let releaseYear
    if (movieDetailsList !== null) {
      adult = movieDetailsList.adult
      backdropPath = movieDetailsList.backdropPath
      posterPath = movieDetailsList.posterPath
      overview = movieDetailsList.overview
      title = movieDetailsList.title
      runtime = movieDetailsList.runtime
      releaseDate = movieDetailsList.releaseDate
      const date = new Date(releaseDate)
      //   const formattedDate = format(date, 'do MMMM yyyy')
      releaseYear = date.getFullYear()
      const duration = intervalToDuration({start: 0, end: runtime * 1000})
      // { minutes: 30, seconds: 7 }

      const zeroPad = num => String(num).padStart(2, '0')
      formattedTime = `${duration.minutes}h ${zeroPad(duration.seconds)}m`
      if (window.matchMedia('(max-width: 768px)').matches) {
        style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${posterPath})`
      } else {
        style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backdropPath})`
      }
    }

    return (
      <div style={style} className="movie-section">
        {/* <Header /> */}
        <div className="movie-info-container">
          <h2 className="movie-details-title">{title}</h2>
          <div className="info-corner">
            <p className="formatted-date"> {formattedTime}</p>
            <p className="is-adult"> {adult ? 'A' : 'U/A'}</p>
            <p className="release-year"> {releaseYear}</p>
          </div>
          <p className="movie-details-overview">{overview}</p>
          <button className="play-button" type="button">
            Play
          </button>
        </div>
      </div>
    )
  }
  const renderVideosView = () => {
    const {
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
      releaseDate,
      similarMovies,
    } = movieDetailsList
    return (
      <div
        style={accountButtonClicked ? style1 : null}
        className="movies-details-container"
      >
        {moviesDetails()}
        <div className="bottom-container">
          <div className="movie-summary-container">
            <div className="movie-summary-data">
              <h1 className="movie-summary-heading">Genres</h1>
              {genres.map(each => (
                <p className="movie-summary-name" key={each.id}>
                  {each.name}
                </p>
              ))}
            </div>
            <div className="movie-summary-data">
              <h1 className="movie-summary-heading">Audio Available</h1>
              {spokenLanguages.map(each => (
                <p className="movie-summary-name" key={each.id}>
                  {each.englishName}
                </p>
              ))}
            </div>
            <div className="movie-summary-data">
              <h1 className="movie-summary-heading">Rating Count</h1>
              <p className="movie-summary-name">{voteCount}</p>
              <h1 className="movie-summary-heading">Rating Average</h1>
              <p className="movie-summary-name">{voteAverage}</p>
            </div>
            <div className="movie-summary-data">
              <h1 className="movie-summary-heading">Budget</h1>
              <p className="movie-summary-name">{budget}</p>
              <h1 className="movie-summary-heading">Release Date</h1>
              <p className="movie-summary-name">{getDate(releaseDate)}</p>
            </div>
          </div>
          <div className="similar-movies-container">
            <h2 className="similar-movies-heading">More like this</h2>
            {/* css from popular videos */}
            <ul className="popular-list">
              {paginationData.map(each => (
                <li
                  className="list-item test"
                  key={each.id}
                  //   onClick={() => navigateToMovie(each.id)}
                >
                  <img
                    className="movie-thumbnail"
                    // src={each.backdropPath}
                    src={each.backdropPath}
                    alt={each.title}
                  />
                </li>
              ))}
            </ul>
            <div className="pagination-button-container">
              <button
                className="left-button pagination-button"
                type="button"
                onClick={onPreviousButtonClicked}
              >
                <AiOutlineDoubleLeft className="arrow" />
              </button>
              <p>
                {pageNo} of {Math.ceil(similarMovies.length / 20)}
              </p>
              <button
                className="right-button pagination-button"
                type="button"
                onClick={onNextButtonClicked}
              >
                <AiOutlineDoubleRight className="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const tryAgainClicked = () => {
    fetchData()
  }
  const somethingWentWrong = () => (
    // css from Search movie
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

  const renderMovies = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView()
      case apiStatusConstants.failure:
        return somethingWentWrong()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="movie-details-bg-container">
      <Header />
      {renderMovies()}
      <ContactUs />
    </div>
  )
}

export default MovieDetails
