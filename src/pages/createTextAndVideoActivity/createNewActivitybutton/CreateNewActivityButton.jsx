import "./CreateNewActivityButton.css"
const CreateNewActivityButton = ({ resetCreateActivity }) => {
  return (
    <>
      <button onClick={() => resetCreateActivity()} className="createNewActivityButtonx">Back to Create Exercise</button>
    </>
  )
}

export default CreateNewActivityButton
