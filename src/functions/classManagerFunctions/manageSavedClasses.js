import { formatDate } from "../../context/DateContext"

export const manageSavedClasses = (updatedClasses, dispatch, dateSelected, emptyClassesList) => {
  const classFound = updatedClasses.find(classItem => formatDate(classItem.date) === formatDate(dateSelected))

  if (classFound === undefined || classFound.classes.length === 0) {
    dispatch({ type: 'SET_CLASS_LIST', payload: emptyClassesList })
  } else if (updatedClasses.length > 0) {
    if (classFound.classes.length !== emptyClassesList.length) {
      const missingClasses = emptyClassesList.filter(emptyClass =>
        !classFound.classes.some(foundClass => foundClass._id === emptyClass._id)
      )
      classFound.classes = [...classFound.classes, ...missingClasses];
    }
    dispatch({ type: 'SET_CLASS_LIST', payload: classFound.classes })
    dispatch({ type: 'SET_CLASS_BY_DATE', payload: classFound })
  }
}


