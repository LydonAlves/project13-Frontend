import "./ActivityCardClassManager.css"

const ActivityCardClassManager = ({
  removeActivity,
  activityName,
  activityTypeTitle,
  activityTitle,
  setShowSelectedTask,
  activitySelected }) => {
  return (
    <div className='chosenActivityDiv'>
      <p className="activityCardActType">{activityTypeTitle}</p>
      <p className="activityCardActTitle">Activity title: {activityTitle}</p>
      <div className="activityCardButtonsDiv">
        <button className='seeActivityButton'
          onClick={() => setShowSelectedTask(activitySelected)}>See Activity</button>
        <button className='removeActivitybutton'
          onClick={() => removeActivity(activityName)}>Remove</button>
      </div>
    </div>
  )
}

export default ActivityCardClassManager 