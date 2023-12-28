/* eslint-disable react/no-unknown-property */

import './index.css'
// css from home
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const TrendingVideos = () => {
  const jwtToken = Cookies.get('jwt_token')

  const [trendingList, setTrendingList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getPascalCaseData = data => ({
    backdropPath: data.backdrop_path,
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
  })

  const fetchTrendingData = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const trendingVideosUrl =
        'https://apis.ccbp.in/movies-app/trending-movies'

      const trendingVideosResponse = await fetch(trendingVideosUrl, options)
      const trendingVideosResponseData = await trendingVideosResponse.json()

      const {results} = trendingVideosResponseData
      const trendingFormattedData = results.map(each => getPascalCaseData(each))
      setTrendingList([...trendingFormattedData])
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchTrendingData()
  }, [])

  const onClickedTryAgain = () => {
    fetchTrendingData()
  }

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
          {trendingList.map(eachLogo => {
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

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )
  const renderFailureView = () => (
    <div className="failure-container">
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

  const renderTrendingVideos = () => {
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

  return renderTrendingVideos()
}

export default TrendingVideos
