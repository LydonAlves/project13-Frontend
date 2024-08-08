import { v4 as uuidv4 } from 'uuid';
import { saveClassActivity } from './saveClassActivity';

export const saveActivity = async (activities, currentDate, stateActivitiesPage, dispatchActivitiesPage, setLoading, userObj) => {
  const { title, questionList } = stateActivitiesPage

  let activitiesID = {
    gapFill: activities.gapFill._id,
    video: activities.video._id
  }

  let finalActivity = {
    activitiesID,
    date: currentDate,
    id: uuidv4(),
    title: title,
    questions: questionList,
    createdBy: userObj._id
  }

  setLoading(true)
  try {
    const savedActivity = await saveClassActivity(finalActivity)
    if (savedActivity.error) {
      throw new Error(videoExerciseResult.error);
    } else {
      dispatchActivitiesPage({ type: 'SET_SAVED_ACTIVITY', payload: savedActivity })
    }
  } catch (error) {
    console.error('Error saving class activity:', error);
    toast.error(`Error: Could not save the activity`)
  } finally {
    setLoading(false)
  }
} 