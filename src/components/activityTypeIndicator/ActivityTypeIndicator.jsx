import "./ActivityTypeIndicator.css"

const ActivityTypeIndicator = ({
  activityButtonArray,
  selectedId
}) => {

  return (
    <ul className="setupButtonDiv">
      {activityButtonArray && activityButtonArray.map((info, index) => (
        <li key={index}
          className={`activityTypeTaskDiv ${selectedId === info.id || selectedId === info._id ? 'selectedTask' : ''}`}>
          <p className="activityTypeText">{info.name}</p>
        </li>

      ))}
    </ul>
  )
}

export default ActivityTypeIndicator