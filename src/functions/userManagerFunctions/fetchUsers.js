import { toast } from "react-toastify";
import { fetchFunction } from "../../utils/fetchAll";

export const fetchUsers = async (dispatch) => {
  try {
    const result = await fetchFunction("user")
    if (result.error) {
      throw new Error(result.error);
    } else {
      dispatch({ type: 'SET_USERS', payload: result })
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    toast.error(`Error: We had some difficulty loading data`)
  }
}