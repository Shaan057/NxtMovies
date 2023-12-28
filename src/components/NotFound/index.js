import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => {
  const width = window.innerWidth <= 768

  return (
    <div className="not-found-container">
      <img
        className="not-found-image"
        src={
          width
            ? 'https://res.cloudinary.com/dx8csuvrh/image/upload/v1699638724/Movies%20App/Login%20Page/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_zv6khb.png'
            : 'https://res.cloudinary.com/dx8csuvrh/image/upload/v1699879219/Movies%20App/Login%20Page/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_2_j6bv3a.png'
        }
        alt="not found"
      />
      <h1>Lost Your Way?</h1>
      <p>
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <button
        className="go-to-home-button"
        type="button"
        // onClick={onClickGoHomeButton}
      >
        <Link to="/" className="go-to-home-link">
          Go To Home
        </Link>
      </button>
    </div>
  )
}

export default NotFound
