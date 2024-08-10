import { backendURL } from "../../utils/backendURL";


export const removeClassFromActivitiesById = async (classIDToRemove) => {
  try {
    const response = await fetch(`${backendURL}classActivityByDate/removeClass/${classIDToRemove}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (response.status === 404) {
      return { message: `No document found with classID ${classIDToRemove}.` };
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to update class activities:`, error);
    throw error;
  }
}
