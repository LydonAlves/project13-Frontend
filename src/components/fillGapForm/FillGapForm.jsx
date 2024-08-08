import React, { useEffect } from "react"
import useCreateTextSegments from "../../hooks/useCreateTextSegmensts"
import "./FillGapForm.css"

const FillGapForm = ({ textObj, inputs, submit, initialAnswersSubmitted, handleInputChange, }) => {
  const { textSegments, createSegmentsFromText } = useCreateTextSegments()
  const { text, title } = textObj

  useEffect(() => {
    createSegmentsFromText(text)
  }, [textObj])

  return (
    <>
      <form className='fillGapTextDiv' onSubmit={submit}>
        {/* <GapText textObj={textObj} handleInputChange={handleInputChange} /> */}
        <div className="gapTextDiv">
          <h3 className="gapTextTitle">{title}</h3>
          <div className="gapFillTextDiv">
            {textSegments.map((segment, index) => (
              <React.Fragment key={index}>
                <span className="gapFillTextSegments">{segment}
                  {index < textSegments.length - 1 && (
                    <>
                      <input
                        className="gapsTextInput"
                        type="text"
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </>
                  )}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <button type="submit" className="gapfillCheckButton primaryGreenButton" >
          {initialAnswersSubmitted === true && inputs.length > 0 ? "Check again" : "Submit"}
        </button>
      </form>
    </>
  )
}

export default FillGapForm
