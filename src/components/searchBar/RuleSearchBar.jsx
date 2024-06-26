import "./RulesSearchBar.css"

const RuleSearchBar = ({
  searchQuery,
  search,
  filteredItems,
  updateRuleInGap
}) => {

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
      <div className="rulesDropdownList">
        {filteredItems.slice().reverse().slice(0, 2).map((item, index) => (
          <div className="rulesContainer" key={item._id}>
            <div className="ruleTitle" >{item.title}</div>
            <p className="ruleExplanation">{item.explanation}</p>
            <button onClick={() => updateRuleInGap(item, index)} className="buttonRuleSearchBar">Assign rule</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RuleSearchBar 