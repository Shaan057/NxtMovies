import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {useContext} from 'react'
import Context from '../../Context'

const style1 = {
  top: -50,
}

const ContactUs = () => {
  const context = useContext(Context)
  const {accountButtonClicked} = context
  return (
    <div
      style={accountButtonClicked ? style1 : {}}
      className="contact-us-section"
    >
      <div className="contact-us-container">
        <button type="button" className="contactUs-button">
          <FaGoogle className="media-icon" />
        </button>
        <button type="button" className="contactUs-button">
          <FaTwitter className="media-icon" />
        </button>
        <button type="button" className="contactUs-button">
          <FaInstagram className="media-icon" />
        </button>
        <button type="button" className="contactUs-button">
          <FaYoutube className="media-icon" />
        </button>
      </div>
      <p className="contact-us">Contact us</p>
    </div>
  )
}

export default ContactUs
