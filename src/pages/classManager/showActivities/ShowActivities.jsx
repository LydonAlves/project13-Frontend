import "./ShowActivities.css"

const ShowActivities = ({
  classActivities,
  formatDateForUI,
  setShowActivities,
  addActivityToClass
}) => {

  return (
    <div className="showActivitiesDiv">
      <h1 className="classTitle">MY ACTIVITIES</h1>
      <div className="myActivitiesContainer">
        {classActivities && (
          <ul className="showActivitiesUl">
            {classActivities.map(exercise => (
              <li key={exercise._id} className="showActivitiesLi">
                <p className="showActivitiesDate">Date Created: {formatDateForUI(exercise.date)}</p>
                <p className="showActivitiesTitle">Title: <span className='tiltedTitle'>{exercise.title}</span></p>
                <div className="showActivitiesButtonDiv">
                  <button onClick={() => setShowActivities(exercise)}
                    className="showActivitiesButton">See activities</button>
                  <button onClick={() => addActivityToClass(exercise)}
                    className="showActivitiesButton">Add to classes</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ShowActivities
