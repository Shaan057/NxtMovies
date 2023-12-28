import './index.css'
import {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Context from '../../Context'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const context = useContext(Context)
  const {setUserData} = context
  const userDetails = {username, password}

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')
    setUserData(userDetails)
  }

  const onSubmitFailure = msg => {
    setShowErrorMsg(true)
    setErrorMsg(msg)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const updateUsername = event => {
    setUsername(event.target.value)
  }

  const updatePassword = event => {
    setPassword(event.target.value)
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="bg-container">
      <div className="website-logo-container">
        <img
          className="website-image"
          src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1699166748/Movies%20App/Login%20Page/Movies_website_Icon_rojwca.png"
          alt="login website logo"
        />
      </div>
      <div className="form-container">
        <form className="form" onSubmit={onSubmitForm}>
          <h1 className="login-text">Login</h1>
          <div>
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <br />
            <input
              id="username"
              value={username}
              className="input"
              type="text"
              placeholder="username"
              onChange={updateUsername}
            />
            <br />
            <br />
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <br />
            <input
              id="password"
              className="input"
              value={password}
              type="password"
              placeholder="password"
              onChange={updatePassword}
            />
            <br />
            <br />
          </div>
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : null}
        </form>
      </div>
    </div>
  )
}

export default Login
