import { loadStudentData } from "./loadStudentData"

export const fetchActivities = async (activityCreatedId, dispatchStudentsPage, userObj) => {
  if (activityCreatedId) {
    loadStudentData(userObj, dispatchStudentsPage, 'SET_ALL_ACTIVITIES', activityCreatedId)
  } else if (userObj.role === "student") {
    loadStudentData(userObj, dispatchStudentsPage, 'SET_ALL_ACTIVITIES')
  }
}