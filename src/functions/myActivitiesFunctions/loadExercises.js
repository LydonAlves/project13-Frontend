import { toast } from "react-toastify";
import { fetchFunction } from "../../utils/fetchAll";


export const loadExercises = async (userObj, setLoading, dispatch) => {
  let userId = userObj._id
  setLoading(true)
  try {
    const [gapFillResult, videoExerciseResult] = await Promise.all([
      fetchFunction("gapfillText/by-userId", userId),
      fetchFunction("videoExercise/by-userId", userId),
    ]);

    if (gapFillResult.error || videoExerciseResult.error) {
      throw new Error(gapFillResult.error || videoExerciseResult.error);
    }

    dispatch({ type: 'SET_GAP_FILL_EXERCISES', payload: gapFillResult });
    dispatch({ type: 'SET_YOUTUBE_EXERCISES', payload: videoExerciseResult });
  } catch (error) {
    console.error('Error fetching exercises:', error.message);
    toast.error(`Error: Could not load the data for this page`)
  } finally {
    setLoading(false);
  }
} 