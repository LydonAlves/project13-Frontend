import { toast } from "react-toastify";
import { deleteByIdinDB } from "../../utils/deleteById";


export const deleteUserFunction = async (dispatch, user,) => {
  try {
    const result = await deleteByIdinDB("user", user._id)

    if (result.error) {
      throw new Error(result.error);
    }
    dispatch({ type: 'SET_SELECTED_USER', payload: null })
    toast.success('User deleted successfully')
  } catch (error) {
    console.error('Error deleting user:', error);
    toast.error(`Error: Could not delete the user correctly`)
  }
} 