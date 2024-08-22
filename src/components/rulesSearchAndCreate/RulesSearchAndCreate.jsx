import React from 'react'
import CreateRuleForm from './../createRuleForm/CreateRuleForm';
import RuleSearchBar from './../searchBar/RuleSearchBar';
import useToggle from '../../hooks/useToggle';

const RulesSearchAndCreate = ({ dispatchExercise, stateExercise, setLoading }) => {
  const [seeSearchBar, setSeeSearchBar] = useToggle()


  return (
    <div className="rulesDiv" >
      <p className="rulesSearchTitle">RULES</p>
      <div className="rulesButtonsDiv">
        <button
          onClick={() => setSeeSearchBar()}
          className={seeSearchBar === true ? "rulesSearchButtonSelected" : "rulesSearchButton"}
        >Search Rule</button>
        <button
          onClick={() => setSeeSearchBar()}
          className={seeSearchBar === false ? "rulesSearchButtonSelected" : "rulesSearchButton"}
        >Add Rule</button>
      </div>


      {seeSearchBar ? (
        <CreateRuleForm
          dispatchExercise={dispatchExercise}
          setLoading={setLoading}
        />
      ) : (
        < RuleSearchBar
          dispatchExercise={dispatchExercise}
          stateExercise={stateExercise}
        />
      )}

    </div>
  )
}

export default RulesSearchAndCreate