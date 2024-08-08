import { toast } from "react-toastify";
import { fetchFunction } from "../../utils/fetchAll";

export const setInitialData = async (dispatch, setLoading, userObj, updatedClasses) => {
  setLoading(true)
  try {
    const [classGroups, classActivitiesResult, classActivitiesByDateResult] = await Promise.all([
      fetchFunction("classGroup/by-userId", userObj._id),
      fetchFunction("classActivity/by-userId", userObj._id),
      fetchFunction("classActivityByDate/by-userId", userObj._id),
    ]);
    dispatch({
      type: 'INITIALIZE_CLASS_MANAGER',
      payload: {
        classList: classGroups,
        emptyClassesList: classGroups,
        classActivities: classActivitiesResult,
        updatedClasses: classActivitiesByDateResult,
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error(`Error: We had some difficulty loading data`)
  } finally {
    setLoading(false)
  }
}