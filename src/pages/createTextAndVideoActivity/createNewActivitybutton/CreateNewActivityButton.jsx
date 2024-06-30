import "./CreateNewActivityButton.css"
const CreateNewActivityButton = ({ resetCreateActivity }) => {
  return (
    <>
      <button onClick={() => resetCreateActivity()} className="createNewActivityButtonx">Create Exercise</button>
    </>
  )
}

export default CreateNewActivityButton
