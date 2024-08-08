import { backendURL } from "../../utils/backendURL"

export const saveActivityToClassGroup = async (classList) => {
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const response = await fetch(
      `${backendURL}classActivityByDate`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(classList)
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(`Activity saved to class group:`, data);
    return data
  } catch (error) {
    console.error('Error in saving activity to class group:', error);
    return { error: `Failed to save: ${error.message}` };
  }
}