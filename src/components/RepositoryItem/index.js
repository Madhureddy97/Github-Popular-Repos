// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepository} = props
  const {id, name, issuesCount, starsCount, forksCount, avatarUrl} =
    eachRepository
  return (
    <li className="each-repository-container">
      <img className="each-repository-top-image" src={avatarUrl} alt={name} />
      <h1 className="each-repository-name">{name}</h1>
      <div className="counts-container">
        <div className="each-count-container">
          <img
            className="each-image"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="each-count">{starsCount} stars</p>
        </div>
        <div className="each-count-container">
          <img
            className="each-image"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="each-count">{forksCount} forks</p>
        </div>
        <div className="each-count-container">
          <img
            className="each-image"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="each-count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
