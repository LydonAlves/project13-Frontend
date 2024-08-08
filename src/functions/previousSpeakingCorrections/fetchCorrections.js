import { toast } from "react-toastify";
import { fetchFunction } from "../../utils/fetchAll";

export const fetchCorrections = async (dispatch, setLoading, userObj) => {
  setLoading(true)
  try {
    const result = await fetchFunction("speakingCorrection/by-userId", userObj._id);

    if (result.error === 404) {
      toast.info(`Notice: There are no speaking corrections yet`)
    }

    if (result.error) {
      throw new Error(result.error);
    } else {
      dispatch({ type: 'SET_ALL_SPEAKING_CORRECTIONS', payload: result })
    }
  } catch (error) {
    console.error('Error fetching speaking corrections:', error);
    toast.error(`Error: We had some difficulty loading data`)

  } finally {
    setLoading(false)
  }
}