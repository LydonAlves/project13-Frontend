// import { fetchByUser } from "../../../utils/fetchByUser";

import { fetchFunction } from "../../../utils/fetchAll";

export const fetchClassGroup = async (userObj, setLoading, setClassGroups) => {
  setLoading(true)
  try {
    const result = await fetchFunction("classGroup/by-userId/", userObj._id)
    if (result.error) {
      throw new Error(result.error);
    } else {
      setClassGroups(result)
    }
  } catch (error) {
    console.error('Error fetching class groups:', error);
    toast.error(`Error: We had some difficulty loading data`)

  } finally {
    setLoading(false)
  }
}