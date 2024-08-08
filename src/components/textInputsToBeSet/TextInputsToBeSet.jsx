import { useEffect } from "react"
import "./TextInputsToBeSet.css"
import { createInitialInputObj } from "../../functions/createActivityFunctions/createInitialInputObj"

const TextInputsToBeSet = ({
  stateExercise,
  dispatchExercise
}) => {
  const { initialInputs, inputsToFill, gapIndex } = stateExercise

  useEffect(() => {
    if (initialInputs.length > 0) {
      const initialInputObj = createInitialInputObj(initialInputs)
      dispatchExercise({
        type: 'CREATE_EXERCISE_PAGE_VALUES',
        payload: {
          inputsToFill: initialInputObj
        }
      })
    }
  }, [initialInputs])


  const addRuleToGap = (id) => {
    dispatchExercise({ type: 'SET_GAP_INDEX', payload: id ? id : "" })
  }

  const removeRuleFromGap = (id) => {
    let updatedRule = inputsToFill.map((item) => {
      return item.id === id ? { ...item, rule: "" } : item
    })

    dispatchExercise({
      type: 'CREATE_EXERCISE_PAGE_VALUES',
      payload: {
        inputsToFill: updatedRule
      }
    })
  }

  const handleInputsSubmitted = (index, text) => {
    dispatchExercise({ type: 'UPDATE_INPUT_TEXT', payload: { index, text } });
  }


  return (
    <>
      <div className="containerTextInputsToBeSet">
        <p className="titleTextInputsToBeSet">GAPS</p>
        <div className="textInputULDiv">
          <ul className="ULTextInputsToBeSet">
            {inputsToFill.map((inputContent, index) => (
              <li className="liTextInputsToBeSet" key={inputContent.id}>
                <label className="gapTextInputsToBeSet">{`Gap: ${index + 1}`}</label>
                <input type="text" onChange={(e) => handleInputsSubmitted(index, e.target.value)} className="inputTextInputsToBeSet" />
                {inputContent.rule && Object.keys(inputContent.rule).length > 0 && (
                  <div className="assignedRuleDiv">
                    <p className="assignedRuleTitle">{inputContent.rule.title}</p>
                    <p className="assignedRuleText">{inputContent.rule.explanation}</p>
                  </div>
                )}
                {Object.keys(inputContent.rule).length > 0 ?
                  <button
                    className="buttonTextIntputsToBeSet"
                    type="button" onClick={() => removeRuleFromGap(inputContent.id)}
                  >Remove explanation</button> :
                  <button
                    className={gapIndex !== inputContent.id ? "buttonTextIntputsToBeSet" : "selectedBTextInp"}
                    disabled={Object.keys(inputContent.rule).length > 0}
                    type="button" onClick={() => addRuleToGap(inputContent.id)}
                  >Add explanation</button>
                }
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default TextInputsToBeSet