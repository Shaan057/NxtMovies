/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */

import {useEffect, useState} from 'react' // useContext

import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
// import {GoChevronLeft, GoChevronRight} from 'react-icons/go'
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'
import Header from '../Header'
import ContactUs from '../ContactUs'
import PopularVideoItem from '../PopularVideoItem'
// import Context from '../../Context'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const PopularVideos = () => {
  const [popularVideos, setPopularVideos] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress)
  const [paginationData, setPaginationData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [prevItems, setPrevItems] = useState(0)
  const [nextItems, setNextItems] = useState(20)

  const getPascalCaseData = data => ({
    backdropPath: data.backdrop_path,
    id: data.id,
    posterPath: data.poster_path,
    title: data.title,
  })
  const fetchData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const jwtToken = Cookies.get('jwt_token')
      const Url = 'https://apis.ccbp.in/movies-app/popular-movies'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(Url, options)
      const {results} = await response.json()
      const formattedData = results.map(each => getPascalCaseData(each))
      setPopularVideos(formattedData)
      setPaginationData(formattedData.slice(prevItems, nextItems))
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )
  const onTryAgainClicked = () => {
    fetchData()
  }

  const onPreviousButtonClicked = () => {
    if (pageNo > 1) {
      let prevn = prevItems - 20
      let nextn = nextItems - 20

      setPageNo(pageNo - 1)
      setPrevItems(prevItems - 20)
      setNextItems(nextItems - 20)
      setPaginationData(popularVideos.slice(prevn, nextn))
    }
  }

  const onNextButtonClicked = () => {
    const nextPages = popularVideos.slice(prevItems + 20, nextItems + 20)
    if (nextPages.length > 0) {
      let prevn = prevItems + 20
      let nextn = nextItems + 20

      setPageNo(pageNo + 1)
      setPrevItems(prevItems + 20)
      setNextItems(nextItems + 20)
      setPaginationData(popularVideos.slice(prevn, nextn))
    }
  }

  const renderFailureView = () => (
    // css from Search Movie
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
        onClick={onTryAgainClicked}
      >
        Try Again
      </button>
    </div>
  )
  const renderVideosView = () => (
    <>
      <ul className="popular-list">
        {paginationData.map(each => (
          <PopularVideoItem key={each.id} data={each} />
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
          {pageNo} of {Math.ceil(popularVideos.length / 20)}
        </p>
        <button
          className="right-button pagination-button"
          type="button"
          onClick={onNextButtonClicked}
        >
          <AiOutlineDoubleRight className="arrow" />
        </button>
      </div>
    </>
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

export default PopularVideos
