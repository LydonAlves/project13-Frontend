import "./NextButtons.css"

const NextButtons = ({
  activityButtonArray,
  dispatch,
  currentStep,
  type

}) => {
  const navigate = (id, direction) => {
    let newId = id + direction;
    if (newId >= activityButtonArray[0].id && newId <= activityButtonArray[activityButtonArray.length - 1].id) {
      let activity = activityButtonArray.find(activity => activity.id === newId);
      dispatch({
        type: type,
        payload: activity.id
      })
    }
  }

  return (
    <div className="divNavButtonsCreateExercise">
      <button
        className="navButtonsCreateExercise"
        onClick={() => navigate(currentStep, -1)}
        disabled={currentStep === activityButtonArray[0].id}
      > &laquo; BACK
      </button>

      <button onClick={() => navigate(currentStep, 1)}
        className="navButtonsCreateExercise"
        disabled={currentStep === activityButtonArray[activityButtonArray.length - 1].id}
      >NEXT &raquo;</button>
    </div>
  )
}

export default NextButtons
