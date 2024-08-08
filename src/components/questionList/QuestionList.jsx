import './QuestionList.css'

const QuestionList = ({ dispatch, questionList }) => {

  const removeFromQuestionList = (id) => {
    dispatch({
      type: 'REMOVE_QUESTION_FROM_LIST',
      payload: id
    });
  }

  return (
    <div className='questionsDiv'>
      <p className='questionDivTitle'>Questions</p>
      {questionList.map((questionObj, index) => (
        <div key={index} className='individualQuestionDiv'>
          <p className='questionDivText'>{questionObj.text} </p>
          <button onClick={() => removeFromQuestionList(questionObj.id)}
            className='questionDivDeleteButton'>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default QuestionList 