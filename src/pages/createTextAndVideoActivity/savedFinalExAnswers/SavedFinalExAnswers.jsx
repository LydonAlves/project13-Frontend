import "./SavedFinalExAnswers.css"

const SavedFinalExAnswers = ({ savedFinalExercise }) => {
  return (
    <div className="answersSavedFinalExerciseDiv">
      <h2 className="answerListTitle">Answers</h2>
      <div className="answerSavedList">
        {savedFinalExercise.answers.map((answerItem, index) => (
          <div key={answerItem._id} className="answerSavedDiv">
            <p className="answerSaved">{index + 1}. {answerItem.answer}</p>
            <p className="ruleSaved"> <strong>Rule:</strong> {answerItem.rule.title} </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedFinalExAnswers