import "./TextInputsToBeSet.css"

const TextInputsToBeSet = ({
  inputsToFill,
  handleInputsSubmitted,
  addRuleToGap,
  updateInputToFill,
  gapIndex
}) => {

  const removeRuleFromGap = (id) => {
    let updatedRule = inputsToFill.map((item) => {
      if (item.id === id) {
        return { ...item, rule: "" }
      } else {
        return item
      }
    })
    updateInputToFill(updatedRule)
  }


  // console.log(inputsToFill);
  // console.log(gapIndex);
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