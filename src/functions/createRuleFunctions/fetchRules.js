import { toast } from "react-toastify";
import { fetchFunction } from "../../utils/fetchAll";

export const fetchRules = async (dispatchExercise, setLoading) => {
  setLoading(true)
  try {
    const result = await fetchFunction("rules")

    if (result.error) {
      throw new Error(result.error);
    } else {
      dispatchExercise({
        type: 'CREATE_EXERCISE_PAGE_VALUES',
        payload: {
          ruleList: result
        }
      })
    }
  } catch (error) {
    console.error('Error loading rules:', error);
    toast.error(`Error: We had some difficulty loading data`)
  } finally {
    setLoading(false)
  }
} 