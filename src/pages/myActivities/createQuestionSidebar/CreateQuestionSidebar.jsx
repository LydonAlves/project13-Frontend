import './CreateQuestionSidebar.css'

const CreateQuestionSidebar = ({ setquestion, question, saveQuestion }) => {
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