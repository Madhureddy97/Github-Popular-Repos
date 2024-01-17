// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, setActiveLanguageId, isActive} = props
  const {id, language} = eachLanguage

  const btnClassName = isActive ? 'normal-btn active-btn' : 'normal-btn'

  const onClickingLanguage = () => {
    setActiveLanguageId(id)
  }

  return (
    <li>
      <button
        type="button"
        className={btnClassName}
        onClick={onClickingLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
