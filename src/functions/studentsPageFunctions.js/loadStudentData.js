import { toast } from "react-toastify";
import { fetchFunction } from "../../utils/fetchAll";
import { findActivityObjById } from "./findActivityObjById";
import { findMostRecentActivity } from "./findMostRecentActivity";

export const loadStudentData = async (userObj, dispatch, actionType, activityCreatedId = null) => {

  try {
    let activityResult
    if (activityCreatedId) {
      activityResult = await fetchFunction("classActivity", activityCreatedId);
      if (activityResult.error) {
        throw new Error(activityResult.error);
      }
    } else {

      const classActivitiesResult = await fetchFunction("classActivityByDate/by-classId", userObj.classGroup);
      if (classActivitiesResult.error) {
        throw new Error(classActivitiesResult.error);
      }


      const mostRecentActivity = findMostRecentActivity(classActivitiesResult);
      const classActivitiesFound = findActivityObjById(mostRecentActivity, userObj.classGroup);

      if (classActivitiesFound.length === 0) {
        throw new Error('No activities found');
      }

      activityResult = await fetchFunction("classActivity", classActivitiesFound[0].activityId);
      if (activityResult.error) {
        throw new Error(activityResult.error);
      }
    }

    dispatch({ type: actionType, payload: activityResult });


  } catch (error) {
    console.error('Error fetching the class activity:', error);
    toast.error(`Error: We had some difficulty loading data`)
  }
}