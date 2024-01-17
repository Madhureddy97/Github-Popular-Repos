import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    apiStatus: apiStatusConstants.initial,
    activeLanguageId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositoryData()
  }

  getRepositoryData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeLanguageId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepositoryItem => ({
        name: eachRepositoryItem.name,
        id: eachRepositoryItem.id,
        issuesCount: eachRepositoryItem.issues_count,
        starsCount: eachRepositoryItem.stars_count,
        forksCount: eachRepositoryItem.forks_count,
        avatarUrl: eachRepositoryItem.avatar_url,
      }))
      this.setState({
        repositoryList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGithubContainer = () => {
    const {repositoryList} = this.state

    return (
      <>
        <ul className="repository-list">
          {repositoryList.map(eachRepository => (
            <RepositoryItem
              eachRepository={eachRepository}
              key={eachRepository.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderFailureImage = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGithubContainer()
      case apiStatusConstants.failure:
        return this.renderFailureImage()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  setActiveLanguageId = id => {
    this.setState({activeLanguageId: id}, this.getRepositoryData)
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="github-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="languages-list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              eachLanguage={eachLanguage}
              key={eachLanguage.id}
              setActiveLanguageId={this.setActiveLanguageId}
              isActive={eachLanguage.id === activeLanguageId}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
