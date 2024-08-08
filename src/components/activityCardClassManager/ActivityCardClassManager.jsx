
import { removeActivity } from "../../functions/myActivitiesFunctions/removeActivity"
import "./ActivityCardClassManager.css"

const ActivityCardClassManager = ({
  dispatch,
  dispatchActivitiesPage,
  activityName,
  activityTypeTitle,
  activityTitle,
  activitySelected
}) => {

  const showSelectedActivity = (activity) => {
    dispatchActivitiesPage({ type: 'SET_SHOW_SELECTED_TASK', payload: activity })
  }


  return (
    <div className='chosenActivityDiv'>
      <p className="activityCardActType">{activityTypeTitle}</p>
      <p className="activityCardActTitle">Activity title: {activityTitle}</p>
      <div className="activityCardButtonsDiv">
        <button className='seeActivityButton'
          onClick={() => showSelectedActivity(activitySelected)}>See Activity</button>
        <button className='removeActivitybutton'
          onClick={() => removeActivity(activityName, dispatch)}>Remove</button>
      </div>
    </div>
  )
}

export default ActivityCardClassManager 