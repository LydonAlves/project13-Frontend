import { toast } from "react-toastify";
import { updateUserClassGroup } from './updateUserClassGroup';

export const submitId = async (userObj, updateUser, setLoading, submittedID, setSuccessfullyJoined) => {
  let classId = submittedID ? submittedID : idInputRef.current.value
  let userId = userObj._id
  setLoading(true)

  try {
    const result = await updateUserClassGroup(userId, classId)
    if (result.error) {
      throw new Error(result.error);
    } else {
      if (result.classGroup) {
        updateUser("classGroup", classId)
        setSuccessfullyJoined()
      }
    }
  } catch (error) {
    console.error('Error updating the class group:', error);
    toast.error(`Error: We had some difficulty loading data`)
  } finally {
    setLoading(false)
  }
}