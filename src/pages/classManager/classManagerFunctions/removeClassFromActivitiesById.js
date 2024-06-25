export const removeClassFromActivitiesById = async (classIDToRemove) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/classActivityByDate/removeClass/${classIDToRemove}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.status === 404) {
      console.warn(`No document found with classID ${classIDToRemove}.`);
      // Return an empty object or a specific value to indicate no document was found
      return { message: `No document found with classID ${classIDToRemove}.` };
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Failed to update class activities:`, error);
    throw error;
  }
};
