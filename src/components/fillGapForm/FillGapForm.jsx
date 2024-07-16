import "./FillGapForm.css"
import GapText from "./gapText/GapText"

const FillGapForm = ({ textObj, inputs, submit, initialAnswersSubmitted, handleInputChange, }) => {


  return (
    <>
      <form className='fillGapTextDiv' onSubmit={submit}>
        <GapText textObj={textObj} handleInputChange={handleInputChange} />
        <button type="submit" className="gapfillCheckButton primaryGreenButton" >
          {initialAnswersSubmitted === true && inputs.length > 0 ? "Check again" : "Submit"}
        </button>
      </form>
    </>
  )
}

export default FillGapForm
