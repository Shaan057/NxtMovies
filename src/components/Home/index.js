/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unknown-property */
import './index.css'

import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
// import {GoAlert} from 'react-icons/go'
import Header from '../Header'
import ContactUs from '../ContactUs'
import TrendingVideos from '../TrendingVideos'
import TopRatedVideos from '../TopRatedVideos'
import Context from '../../Context'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const style2 = {
  top: -125,
}

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  const [randomMovie, setRandomMovie] = useState({})
  const [originalsList, setOriginalsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const context = useContext(Context)
  const {accountButtonClicked} = context
  const getPascalCaseData = data => ({
    backdropPath: data.backdrop_path,
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
  })

  const fetchOriginalsData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const originalsVideosUrl = 'https://apis.ccbp.in/movies-app/originals'
      const originalsVideosResponse = await fetch(originalsVideosUrl, options)
      const originalsVideosResponseData = await originalsVideosResponse.json()
      const originalsFormattedData = originalsVideosResponseData.results.map(
        each => getPascalCaseData(each),
      )
      setOriginalsList([...originalsFormattedData])
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    fetchOriginalsData()
  }, [])

  const onClickedTryAgain = () => {
    fetchOriginalsData()
  }

  useEffect(() => {
    const randomMovieDetails = () => {
      const originalsListLength = originalsList.length
      if (originalsListLength > 0) {
        const randomNumber = Math.floor(Math.random() * originalsListLength)

        setRandomMovie(originalsList[randomNumber])
      }
    }
    randomMovieDetails()
  }, [originalsList])

  const renderVideosView = () => {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      //
      //   autoplay: true,
      //   autoplaySpeed: 2000,
      //   lazyLoad: true,
      //   rtl: true,
      //
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            infinite: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            infinite: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            infinite: false,
          },
        },
      ],
    }

    return (
      <div className="slick-container">
        <Slider {...settings}>
          {originalsList.map(eachLogo => {
            const {id, backdropPath, posterPath, title} = eachLogo
            return (
              <Link to={`movies/${eachLogo.id}`} key={id} className="test">
                <div className="slide">
                  <img className="logo-image" src={posterPath} alt={title} />
                </div>
              </Link>
            )
          })}
        </Slider>
      </div>
    )
  }
  const renderLoadingViewTop = () => (
    <div
      style={accountButtonClicked ? style2 : {}}
      className="top-section-loader-container"
      testid="loader"
    >
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )
  const renderFailureView = () => (
    <div className="failure-container">
      {/* <GoAlert color="red" className="goAlert-warning" /> */}
      <img
        className="goAlert-warning"
        src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1702469161/Movies%20App/Login%20Page/alert-triangle_rxyax1.png"
        alt="failure view"
      />
      <p className="failure-home-text">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-try-again-button"
        type="button"
        onClick={onClickedTryAgain}
      >
        Try Again
      </button>
    </div>
  )
  const renderFailureViewTop = () => (
    <div className="home-failure-view">
      {/* <GoAlert color="red" className="goAlert-warning" /> */}
      <img
        className="go-Alert-warning"
        src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1702469161/Movies%20App/Login%20Page/alert-triangle_rxyax1.png"
        alt="failure view"
      />
      <p className="failure-home-text">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-try-again-button"
        type="button"
        onClick={onClickedTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  const renderOriginalsVideos = () => {
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

  const randomMovieDetails = () => {
    // const {randomMovie} = originalsData
    let style = {}
    let overview
    let title
    let posterPath
    let backdropPath
    if (randomMovie !== undefined) {
      style = {
        // backgroundImage: `url(${posterPath})`,
      }
      backdropPath = randomMovie.backdropPath
      posterPath = randomMovie.posterPath
      //   id = randomMovie.id
      overview = randomMovie.overview
      title = randomMovie.title

      if (window.matchMedia('(max-width: 768px)').matches) {
        style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${posterPath})`
      } else {
        style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backdropPath})`
      }
      if (accountButtonClicked) {
        style.top = -130
      }
    }

    return (
      <div style={style} className="random-movie-section zz">
        {/* <Header /> */}
        <div className="info-container">
          <h2 className="title">{title}</h2>
          <p className="overview">{overview}</p>
          <button className="play-button play-button-hover" type="button">
            Play
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      style={accountButtonClicked ? style2 : {}}
      className="home-bg-container"
    >
      <Header />
      {apiStatus === apiStatusConstants.inProgress
        ? renderLoadingViewTop()
        : apiStatus === apiStatusConstants.failure
        ? renderFailureViewTop()
        : randomMovieDetails()}
      <div
        style={accountButtonClicked ? style2 : {}}
        className="home-bottom-container"
      >
        <div className="main-container">
          <h1 className="videos-heading">Trending Now</h1>
          <TrendingVideos />
        </div>

        <div className="main-container">
          <h1 className="videos-heading">Top Rated</h1>
          <TopRatedVideos />
        </div>

        <div className="main-container">
          <h1 className="videos-heading">Originals</h1>
          {renderOriginalsVideos()}
        </div>
        <br />
      </div>
      <ContactUs />
    </div>
  )
}

export default Home
