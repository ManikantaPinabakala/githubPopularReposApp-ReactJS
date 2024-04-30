import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESSFUL',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    selectedFilterId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getRepoList()
  }

  getRepoList = async () => {
    const {selectedFilterId} = this.state
    try {
      const response = await fetch(
        `https://apis.ccbp.in/popular-repos?language=${selectedFilterId}`,
      )

      const data = await response.json()

      const updatedData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
        starsCount: eachRepo.stars_count,
      }))

      this.setState({
        repoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setSelectedFilterId = id => {
    this.setState(
      {selectedFilterId: id, apiStatus: apiStatusConstants.inProgress},
      this.getRepoList,
    )
  }

  renderLanguageFilterList = () => {
    const {selectedFilterId} = this.state

    return (
      <ul className="filters-list">
        {languageFiltersData.map(eachFilter => (
          <LanguageFilterItem
            key={eachFilter.id}
            filterDetails={eachFilter}
            setSelectedFilterId={this.setSelectedFilterId}
            isSelected={eachFilter.id === selectedFilterId}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepoList = () => {
    const {repoList} = this.state

    return (
      <ul className="repos-list">
        {repoList.map(eachRepoItem => (
          <RepositoryItem key={eachRepoItem.id} repoDetails={eachRepoItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepoContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderRepoList()
    }
  }

  render() {
    return (
      <div className="github-repos-container">
        <h1 className="main-heading">Popular</h1>
        {this.renderLanguageFilterList()}
        {this.renderRepoContent()}
      </div>
    )
  }
}

export default GithubPopularRepos
