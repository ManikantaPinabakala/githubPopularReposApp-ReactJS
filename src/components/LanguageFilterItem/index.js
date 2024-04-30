import './index.css'

const LanguageFilterItem = props => {
  const {isSelected, filterDetails, setSelectedFilterId} = props
  const {id, language} = filterDetails

  const filterButtonClassName = isSelected
    ? 'filter-button selected'
    : 'filter-button'

  const onClickFilter = () => {
    setSelectedFilterId(id)
  }

  return (
    <div className="filter-container">
      <button
        type="button"
        onClick={onClickFilter}
        className={filterButtonClassName}
      >
        {language}
      </button>
    </div>
  )
}

export default LanguageFilterItem
