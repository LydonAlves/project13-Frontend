import { useEffect } from "react";
import "./NextButtons.css"

const NextButtons = ({
  activityButtonArray,
  chooseStepOfProcess,
  nextButton,
  setNextButton,
  setSelectedId,
  selectedId
}) => {

  useEffect(() => {
    if (activityButtonArray.length > 0) {
      setSelectedId(activityButtonArray[0].id);
    }
  }, []);

  useEffect(() => {
    if (nextButton === true) {
      setSelectedId(activityButtonArray[1].id)
    }
    if (setNextButton) {
      setNextButton(false)
    }
  }, [nextButton])


  const goBack = (id) => {
    if (id > activityButtonArray[0].id) {
      let activityId = id - 1
      let activity = activityButtonArray.find(activity => activity.id === activityId)
      chooseStepOfProcess(activity.value)
      setSelectedId(activity.id)
    }
  }

  const goForward = (id) => {
    if (id < activityButtonArray[activityButtonArray.length - 1].id) {
      let activityId = id + 1
      let activity = activityButtonArray.find(activity => activity.id === activityId)
      chooseStepOfProcess(activity.value)
      setSelectedId(activity.id)
    }
  }

  return (
    <div className="divNavButtonsCreateExercise">
      <button
        className="navButtonsCreateExercise"
        onClick={() => goBack(selectedId)}
        disabled={selectedId === activityButtonArray[0].id}
      > &laquo; BACK
      </button>

      <button onClick={() => goForward(selectedId)}
        className="navButtonsCreateExercise"
        disabled={selectedId === activityButtonArray[activityButtonArray.length - 1].id}
      >NEXT &raquo;</button>
    </div>
  )
}

export default NextButtons
