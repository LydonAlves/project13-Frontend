import { backendURL } from "../../../utils/backendURL"

export const saveNewClassGroup = async (classGroup) => {
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const response = await fetch(
      `${backendURL}/classGroup`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(classGroup)
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error in saving class group:', error);
    return { error: `Failed to save: ${error.message}` };
  }
} 