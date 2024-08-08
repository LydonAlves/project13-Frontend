export const createTextSegments = (text) => {
  const segments = text ? text.split('---') : [];

  const initialInputs = segments
    .filter((_, index) => index < segments.length - 1)
    .map((_, index) => (index + 1).toString());

  return {
    segments,
    initialInputs
  };
};