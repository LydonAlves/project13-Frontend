import React, { useEffect } from "react"
import "./GapText.css"
import useCreateTextSegments from "../../../hooks/useCreateTextSegmensts"

const GapText = ({ textObj, handleInputChange, }) => {
  const { textSegments, createSegmentsFromText } = useCreateTextSegments()
  const { text, title } = textObj

  useEffect(() => {
    createSegmentsFromText(text)
  }, [textObj])

  //! <React.Fragment>  is used here to group the list of children without adding 
  //! extra nodes to the DOM. It's particularly useful in the map()
  return (
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
  )
}

export default GapText

