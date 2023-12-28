import './index.css'
import {Link} from 'react-router-dom'

const PopularVideoItem = props => {
  const {data} = props
  const {id, title, backdropPath, posterPath} = data
  return (
    <li className="list-item test">
      <Link to={`movies/${id}`}>
        <img
          className="movie-thumbnail"
          src={backdropPath}
          //   posterPath
          // backdropPath
          alt={title}
        />
      </Link>
    </li>
  )
}

export default PopularVideoItem
