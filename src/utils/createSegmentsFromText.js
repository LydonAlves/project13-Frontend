export const createSegmentsFromText = (text) => {
  //* this is the origional text split into different parts
  const segments = text ? text.split('---') : []

  //* the current element (_) and its index (index)
  const initialInputs = segments
    .filter((_, index) => index < segments.length - 1)
    .map((_, index) => (index + 1).toString())

  return { segments, initialInputs }
}