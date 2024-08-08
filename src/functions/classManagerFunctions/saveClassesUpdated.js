import { toast } from "react-toastify";
import { updateById } from "../../utils/updateById";
import { saveActivityToClassGroup } from "./saveActivityToClassGroup";

export const saveClassesUpdated = async (dispatch, state, userObj) => {
  const { classList, classByDate, dateSelected } = state

  const checkIfupdateNeeded = () => {
    if (state.classByDate) {
      return state.classList !== state.classByDate && state.classByDate.classes.some(item => item.activityObj)
    }
    return
  }

  const updateNeeded = checkIfupdateNeeded()

  const classesUpdate = {
    classes: classList,
    date: dateSelected.toISOString(),
    createdBy: userObj._id,
  }

  try {
    let result;
    if (updateNeeded) {
      result = await updateById("classActivityByDate", classByDate._id, classesUpdate);
    } else {
      result = await saveActivityToClassGroup(classesUpdate);
    }

    if (result.error) {
      throw new Error(result.error);
    }

    dispatch({ type: 'SET_CLASSES_FOR_DAY', payload: result.classes });

    if (!updateNeeded) {
      dispatch({ type: 'SET_CLASS_BY_DATE', payload: result });
    }

    console.log("Classes for day updated:", result.classes);
  } catch (error) {
    console.error('Error saving or updating data:', error);
    toast.error('Error: Could not update the class groups correctly');
  }
};
