import { backendURL } from '../../utils/backendURL';

export const saveSpeakingCorrection = async (exercise, setLoading, dispatch) => {
  console.log("save speaking corrections", exercise);
  const headers = {
    "Content-Type": "application/json"
  }
  if (!exercise.corrections) {
    return
  }

  setLoading(true)
  try {
    const response = await fetch(`${backendURL}speakingCorrection`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(exercise)
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    dispatch({
      type: 'ADD_TO_CORRECTED_TEXT_ARRAY',
      payload: data
    })

    console.log("Speaking correction saved:", data);
    return data.hash
  } catch (error) {
    console.error('Error in saving speaking correction:', error);
    return { error: `Failed to save: ${error.message}` };
  } finally {
    setLoading(false)
  }
}





