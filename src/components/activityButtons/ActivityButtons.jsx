import "./ActivityButtons.css"

const ActivityButtons = ({ dispatch, state }) => {

  const buttonArray = [
    {
      id: 1,
      name: "Video",
      value: "youTubeFillGap"
    },
    {
      id: 2,
      name: "Fill gap text",
      value: "fillGapText"
    },
    {
      id: 3,
      name: "Questions",
      value: "questions",
    },
  ]

  const handleActivityType = (value) => {
    dispatch({ type: 'SET_ACTIVITY_TYPE', payload: value })
  }

  return (
    <div className="activityButtonsDivSPage">
      {
        buttonArray.map((item, index) => (
          <button
            className={item.value === state.activityType ? "primaryGreenButton" : "primaryGreenButtonUnselected"}
            onClick={() => handleActivityType(item.value)}
            key={index}
          >{item.name}</button>
        ))
      }
    </div>
  )
}

export default ActivityButtons