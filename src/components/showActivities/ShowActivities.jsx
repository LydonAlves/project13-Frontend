import { formatDate } from "../../context/DateContext"
import { addActivityToClass } from "../../functions/classManagerFunctions/addActivityToClass"
import "./ShowActivities.css"


const ShowActivities = ({
  classActivities,
  dispatch,
  classList,
}) => {


  const handleAddActivityToClass = (exercise) => {
    addActivityToClass(dispatch, exercise, classList)
  }

  const handleSeeActivities = (exercise) => {
    dispatch({ type: 'SET_ACTIVITIES_TO_SHOW', payload: exercise })
  }


  return (
    <div className="showActivitiesDiv">
      <h1 className="classTitle">MY ACTIVITIES</h1>
      <p className="classSubtitle">The ativities you created in My Activities</p>
      <div className="myActivitiesContainer">
        {classActivities && (
          <ul className="showActivitiesUl">
            {classActivities.map(exercise => (
              <li key={exercise._id} className="showActivitiesLi">
                <p className="showActivitiesDate">Date Created: {formatDate(exercise.date)}</p>
                <p className="showActivitiesTitle">Title: <span className='tiltedTitle'>{exercise.title}</span></p>
                <div className="showActivitiesButtonDiv">
                  <button onClick={() => handleSeeActivities(exercise)}
                    className="showActivitiesButton">See activities</button>
                  <button onClick={() => handleAddActivityToClass(exercise)}
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
