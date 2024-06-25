export const deleteById = (id, setList) => {
  console.log(id);

  setList(prev => prev.filter(item => item._id !== id && item.id !== id))
}

export const deleteByIdinDB = async (exerciseType, _id) => {
  // console.log("Exercise type", exerciseType)
  // console.log("Exercise id", _id);

  try {
    const response = await fetch(`http://localhost:3000/api/v1/${exerciseType}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Deleted ${exerciseType} with ID ${_id}:`, data);
    return data;
  } catch (error) {
    console.error(`Failed to delete ${exerciseType} with ID ${_id}:`, error);
    throw error;
  }
}

