import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = repoDetails

  return (
    <li className="repo-container">
      <img src={avatarUrl} alt={name} className="repo-avatar" />
      <p className="repo-name">{name}</p>
      <div>
        <div className="repo-details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="repo-detail-icon"
          />
          <p className="repo-detail">{starsCount} stars</p>
        </div>
        <div className="repo-details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="repo-detail-icon"
          />
          <p className="repo-detail">{forksCount} forks</p>
        </div>
        <div className="repo-details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="repo-detail-icon"
          />
          <p className="repo-detail">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
