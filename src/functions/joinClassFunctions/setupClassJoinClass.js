import { fetchFunction } from "../../utils/fetchAll"

export const setupClasses = async (userObj, setCurrentClass, setLoading) => {
  setLoading(true)
  if (userObj.classGroup === "1") {
    return
  }

  try {
    const result = await fetchFunction("classGroup", userObj.classGroup)
    if (result === null) {
      return
    }

    if (result.error) {
      throw new Error(result.error);
    } else {
      setCurrentClass(result)
      return
    }

  } catch (error) {
    console.error('Error fetching the class group:', error);
  } finally {
    setLoading(false)
  }
}