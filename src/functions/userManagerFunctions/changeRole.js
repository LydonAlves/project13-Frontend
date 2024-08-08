import { toast } from "react-toastify";
import { updateById } from './../../utils/updateById';


export const changeRole = async (user, selectedUser, dispatchUserManager, setLoading) => {
  const newRole = selectedUser.role === 'student' ? 'teacher' : 'student';
  const updatedData = { role: newRole }
  setLoading(true)
  try {
    const result = await updateById("user", user._id, updatedData)

    if (result.error) {
      throw new Error(result.error);
    } else {
      dispatchUserManager({ type: 'SET_SELECTED_USER', payload: null })
    }
  } catch (error) {
    console.error('Error updating the user:', error);
    toast.error(`Error: Could not the user`)
  } finally {
    setLoading(false)
  }
}