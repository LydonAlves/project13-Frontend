export const fetchByRole = async (url, userRole, setItem) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/${url}/by-userRole/${userRole}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // setItem(data ? data : [])
    return data
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { error: `Failed to fetch ${url}: ${error.message}` };
  }
};
