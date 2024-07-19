import { backendURL } from './backendURL';
import Loading from '../components/loading/Loading';

export const saveSpeakingCorrection = async (exercise, setCorrectedTextArray) => {

  const headers = {
    "Content-Type": "application/json"
  }
  if (!exercise.corrections) {
    return
  }

  Loading(true)
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
    console.log(data);
    if (setCorrectedTextArray) {
      setCorrectedTextArray(prev => {
        return [...prev, data]
      })
    }

    console.log("Speaking correction saved:", data);
    return data.hash
  } catch (error) {
    console.error('Error in saving speaking correction:', error);
    return { error: `Failed to save: ${error.message}` };
  } finally {
    Loading(false)
  }
}





