import { toast } from "react-toastify";
import { fetchFunction } from "../../utils/fetchAll";
import { deleteByIdinDB } from "../../utils/deleteById";

export const checkUpdatedClasses = async (setLoading, dispatch, updatedClasses, classesForDay) => {
  setLoading(true)
  try {
    await Promise.all(
      updatedClasses.map(async (classItem) => {
        if (classItem.classes.length === 0) {
          await deleteByIdinDB("classActivityByDate", classItem._id);
        }
      })
    );
  } catch (error) {
    console.error('An error occurred:', error);
    toast.error(`Error: Could not update the class groups correctly`)
  } finally {
    setLoading(false)
  }

  if (classesForDay.length > 0) {
    setLoading(true)
    try {
      const result = await fetchFunction("classActivityByDate");
      console.log("result of classes", result);

      if (result.error) {
        throw new Error(result.error);
      } else {
        dispatch({ type: 'SET_UPDATED_CLASSES', payload: result })
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error(`Error: Could not update the class groups correctly`)
    } finally {
      setLoading(false)
    }
  }
};