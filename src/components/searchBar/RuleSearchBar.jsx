import useSearch from "../../hooks/useSearch"
import "./RulesSearchBar.css"

const RuleSearchBar = ({
  dispatchExercise,
  stateExercise
}) => {
  const { ruleList, gapIndex } = stateExercise
  const { searchQuery, search, filteredItems } = useSearch(ruleList)

  const updateRuleInGap = (item) => {
    dispatchExercise({ type: 'UPDATE_INPUT', payload: { gapIndex, rule: item } })
  }

  return (
    <div className="searchBarRules">
      <div className="searchTitleAndInput">
        <input
          value={searchQuery}
          type="search"
          onChange={e => search(e.target.value)}
          className="searchInput"
          placeholder="Type here to search rules..."
        />
      </div>
      {filteredItems && filteredItems.length > 0 && (
        <div className="rulesDropdownList">
          {filteredItems.slice().reverse().slice(0, 2).map((item) => (
            <div className="rulesContainer" key={item._id}>
              <div className="ruleTitle" >{item.title}</div>
              <p className="ruleExplanation">{item.explanation}</p>
              <button onClick={() => updateRuleInGap(item)} className="buttonRuleSearchBar">Assign rule</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RuleSearchBar 