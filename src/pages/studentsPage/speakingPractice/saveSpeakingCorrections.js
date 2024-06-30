import { backendURL } from './../../../utils/backendURL';

export const saveSpeakingCorrection = async (exercise, setCorrectedTextArray) => {

  const headers = {
    "Content-Type": "application/json"
  }
  if (!exercise.corrections) {
    return
  }

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
  }
}


export const checkRequestStatus = async (hash) => {

  try {

    const response = await fetch(`${backendURL}openai/request/status/${hash}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error checking request status:', error);
    return { error: `Failed to check status: ${error.message}` };
  }
};


