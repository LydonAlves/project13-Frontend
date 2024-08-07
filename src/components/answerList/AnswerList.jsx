import { useState } from "react"
import "./AnswerList.css"

const AnswerList = ({ answerList, inputs }) => {
  const [showExplanationIndex, setShowExplanationIndex] = useState(null)

  const handleExplanationToggle = (index) => {
    setShowExplanationIndex(showExplanationIndex === index ? null : index)
  }

  return (
    <div className="answerListContainer">
      <h1 className="studentAnswer">Your answers</h1>
      <div className="answerListDiv">
        <ul className="answerListUl">
          {answerList.map((answer, index) => (
            <li className="answerDiv" key={index}>
              <div className="studentAnswerGapFill">
                <p>{index + 1}. {inputs[index].answer}</p>
                <button
                  onClick={() => handleExplanationToggle(index)}
                  className="answerListButtonGapfill primaryBlueButton">See Answer</button>
              </div>
              <div className="individualAnswerDiv">
                {showExplanationIndex === index ? (
                  <>
                    <p className="answerListCorrectAnswer">
                      <strong>Correct Answer:</strong> {answer.answer}
                    </p>
                    <p className="answerListRule">
                      <strong>Rule:</strong> {answer.rule.title}
                    </p>
                    <p>
                      <strong>Explanation:</strong> {answer.rule.explanation}
                    </p>
                  </>
                ) :
                  <p className={inputs[index].correctAnswer === true ? 'isCorrect' : 'incorrect'}>{inputs[index].correctAnswer === true ? 'Correct' : 'Incorrect'}</p>
                }
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AnswerList