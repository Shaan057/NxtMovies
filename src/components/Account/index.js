import './index.css'
import Cookies from 'js-cookie'
import {useContext} from 'react'
import Header from '../Header'
import ContactUs from '../ContactUs'
import Context from '../../Context'

const Account = props => {
  const {history} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const {userData} = useContext(Context)
  const {username, password} = userData
  let name
  let stars
  if (password === undefined) {
    name = 'rahul'
    stars = '**********'
  } else {
    name = username
    stars = '*'.repeat(password.length)
  }
  return (
    <div className="popular-bg-container">
      <Header />
      <div className="accounts-container">
        <h2>Account</h2>
        <hr className="hr-rule" />
        <div className="membership-container">
          <p className="type">Member ship</p>
          <div>
            <p>{name}@gmail.com</p>
            <p>
              Password: <span>{stars}</span>
            </p>
          </div>
        </div>
        <hr className="hr-rule" />
        <div className="plan-details-container">
          <p className="type">Plan details </p>
          <div className="plan-details">
            <p>Premium</p>
            <p type="button" className="ultra-hd-button">
              Ultra HD
            </p>
          </div>
        </div>
        <hr className="hr-rule" />

        <button className="logout-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <ContactUs />
    </div>
  )
}

export default Account
