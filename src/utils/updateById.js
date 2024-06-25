export const updateById = async (exerciseType, _id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/${exerciseType}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Failed to update ${exerciseType}:`, error);
    throw error;
  }
}


