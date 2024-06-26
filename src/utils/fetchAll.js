import { backendURL } from "./backendURL"

export const fetchAll = async (url) => {
  try {
    const response = await fetch(`${backendURL}/api/v1${url}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Could not fetch ${url}:`, error)
    throw error;
  }
}

