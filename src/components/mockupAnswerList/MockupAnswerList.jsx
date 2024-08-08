import "./MockupAnswerList.css"

const MockupAnswerList = ({ answerList }) => {

  return (
    <div className="mockupAnswerListContainer">
      <h1 className="mockupTitle">Answer List</h1>
      <div className="mockupAnswerList">
        {answerList.map((answer, index) => (
          <div key={index} className="mockupMainDiv">
            <p className="mockupAnswerNumber"> <strong>{index + 1}.</strong></p>
            <div className="mockupAnswerDiv">
              <div className="mockupCorrectAnswerDiv">
                <p><strong>Correct Answer:</strong> {answer.answer}</p>
              </div>
              <p className="mockupExplanation"><strong>Explanation:</strong> {answer.rule.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MockupAnswerList 