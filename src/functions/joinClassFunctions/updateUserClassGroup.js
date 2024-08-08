
import { backendURL } from './../../utils/backendURL';

export const updateUserClassGroup = async (userId, classGroup) => {
  const headers = {
    "Content-Type": "application/json"
  }

  try {
    const response = await fetch(`${backendURL}user/${userId}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({ classGroup })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User class group updated:", data);
    return data;
  } catch (error) {
    console.error('Error updating user class group:', error);
    return { error: `Failed to update: ${error.message}` };
  }
}
