import "./ActivityTypeIndicator.css"

const ActivityTypeIndicator = ({
  activityButtonArray,
  currentStep
}) => {

  return (
    <ul className="setupButtonDiv">
      {activityButtonArray && activityButtonArray.map((info, index) => (
        <li key={index}
          className={`activityTypeTaskDiv ${currentStep === info.id || currentStep === info._id ? 'selectedTask' : ''}`}>
          <p className="activityTypeText">{info.name}</p>
        </li>

      ))}
    </ul>
  )
}

export default ActivityTypeIndicator