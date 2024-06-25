export const fetchById = async (exerciseType, _id) => {
  // console.log(exerciseType)
  console.log(_id);
  try {
    const response = await fetch(`http://localhost:3000/api/v1/${exerciseType}/${_id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error(`Failed to fetch ${exerciseType}:`, error);
    throw error;
  }
};

