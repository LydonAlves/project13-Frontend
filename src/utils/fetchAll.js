import { backendURL } from "./backendURL"

export const fetchFunction = async (urlSpecified, additionalInfo) => {
  const finalURL = additionalInfo ? `${backendURL}${urlSpecified}/${additionalInfo}` : `${backendURL}${urlSpecified}`
  try {
    const response = await fetch(finalURL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data

  } catch (error) {
    console.error(`Could not fetch ${urlSpecified}:`, error)
    throw error;
  }
}