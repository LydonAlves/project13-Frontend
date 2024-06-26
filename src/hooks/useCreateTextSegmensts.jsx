import { useState } from "react"

const useCreateTextSegments = () => {
  const [textSegments, setTextSegments] = useState([])

  const createSegmentsFromText = (text) => {
    //* this is the origional text split into different parts
    const segments = text ? text.split('---') : []
    setTextSegments(segments)
  }

  //* the current element (_) and its index (index)
  const initialInputs = textSegments ? textSegments
    .filter((_, index) => index < textSegments.length - 1)
    .map((_, index) => (index + 1).toString()) : []

  return {
    textSegments,
    createSegmentsFromText,
    initialInputs
  }
}

export default useCreateTextSegments