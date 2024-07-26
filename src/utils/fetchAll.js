import { backendURL } from "./backendURL"

// export const fetchAll = async (url) => {
//   try {
//     const response = await fetch(`${backendURL}${url}`)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error(`Could not fetch ${url}:`, error)
//     throw error;
//   }
// }


export const fetchFunction = async (urlSpecified, additionalInfo) => {

  const finalURL = additionalInfo ? `${backendURL}${urlSpecified}/${additionalInfo}` : `${backendURL}${urlSpecified}`
  console.log("finalURL", finalURL);

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