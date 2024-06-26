import "./ActivityButtons.css"

const ActivityButtons = ({ buttonArray, setActivityType, activityType }) => {
  return (
    <div className="activityButtonsDivSPage">
      {
        buttonArray.map((item, index) => (
          <button
            className={item.value === activityType ? "primaryGreenButton" : "primaryGreenButtonUnselected"}
            onClick={() => setActivityType(item.value)}
            key={index}
          >{item.name}</button>
        ))
      }
    </div>
  )
}

export default ActivityButtons