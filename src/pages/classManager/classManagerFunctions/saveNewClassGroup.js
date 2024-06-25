export const saveNewClassGroup = async (classGroup) => {
  const headers = {
    "Content-Type": "application/json"
  }
  console.log(classGroup);

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/classGroup`,
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
    console.log(`Class group saved:`, data);
    return data
  } catch (error) {
    console.error('Error in saving class group:', error);
    return { error: `Failed to save: ${error.message}` };
  }
} 