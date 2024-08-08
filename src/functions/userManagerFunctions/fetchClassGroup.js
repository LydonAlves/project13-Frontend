
import { toast } from "react-toastify";
import { fetchFunction } from "../../utils/fetchAll";

export const fetchClassGroup = async (userObj, dispatch) => {
  try {
    const result = await fetchFunction("classGroup/by-userId", userObj._id)
    if (result.error) {
      throw new Error(result.error);
    } else {
      dispatch({ type: 'SET_CLASS_GROUPS', payload: result })
    }
  } catch (error) {
    console.error('Error fetching class groups:', error);
    toast.error(`Error: We had some difficulty loading data`)
  }
}