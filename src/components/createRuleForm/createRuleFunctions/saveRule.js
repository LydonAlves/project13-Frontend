import { backendURL } from './../../../utils/backendURL';

export const saveRule = async (rule) => {
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const response = await fetch(
      `${backendURL}/rules`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(rule)
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error in saving rule:', error);
    return { error: `Failed to save: ${error.message}` };
  }
}