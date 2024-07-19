import { deleteById } from '../../../utils/deleteById'
import './QuestionList.css'

const QuestionList = ({ questionList, setQuestionList }) => {
  return (
    <div className='questionsDiv'>
      <p className='questionDivTitle'>Questions</p>
      {questionList.map((questionObj, index) => (
        <div key={index} className='individualQuestionDiv'>
          <p className='questionDivText'>{questionObj.text} </p>
          <button onClick={() => deleteById(questionObj.id, setQuestionList)}
            className='questionDivDeleteButton'>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default QuestionList