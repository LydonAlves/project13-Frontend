
export const addActivityToClass = (dispatch, exercise, classList) => {
  const classSelected = classList.some(classItem => classItem.selected === true)

  let activity = {
    activityId: exercise._id,
    title: exercise.title
  }

  if (classSelected) {
    dispatch({
      type: 'SET_ACTIVITY_FOR_SELECTED_CLASS',
      payload: activity
    })
  }

  dispatch({ type: 'DESELECT_ALL_CLASSES' });
} 