import { toast } from 'react-toastify';
import './CreateQuestionSidebar.css'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const CreateQuestionSidebar = ({ dispatch, questionList, type }) => {
  const [question, setquestion] = useState("")

  const saveQuestion = () => {
    if (questionList.length === 3) {
      toast.error(`You can have a max of three questions`)
      return
    }

    if (question !== "") {
      const questionObj = {
        text: question,
        id: uuidv4()
      }
      dispatch({ type: type, payload: questionObj })
      setquestion("")
    }
  }

  return (
    <div className='addQuestionsMyActivities'>
      <p className='sideBarTitleMyClasses'>ADD QUESTION HERE</p>
      <p className='addQuestionText'>Add up to three questions that students will answer orally</p>
      <textarea
        value={question}
        type="text"
        onChange={(e) => setquestion(e.target.value)}
        className='textAreaSideBarMyClasses' />
      <button
        onClick={() => saveQuestion()}
        className='activitiesSidebarTitleButton'
        type='button'
      >SAVE</button>
    </div>
  )
}

export default CreateQuestionSidebar