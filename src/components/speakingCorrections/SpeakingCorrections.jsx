import "./SpeakingCorrections.css"

const SpeakingCorrections = ({ answersToShow }) => {

  return (
    <div className="voiceToTextCorrectonDiv">
      <div className="questionAndAnswer">
        <p className="questionText">{answersToShow.question.text}</p>
        <div className="studentInputDiv">
          <p>{answersToShow.corrections.student_input}</p>
        </div>
      </div>

      <div className="errorsListContainer">
        <p className="errorsAndCorrections"> Errors and corrections</p>
        <div className="errorsListDiv">
          {answersToShow.corrections.identified_errors.reverse().map((item, index) => (
            <div className="voiceToTextErrorDiv" key={index}>
              <p className="error"><strong>Error:</strong> {item.error}</p>
              <p className="correction"><strong>Correction:</strong> {item.correction}</p>
              <p className="explanation"><strong>Explanation:</strong> {item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpeakingCorrections    