export const getSavedAnswers = (key, defaultValue, dispatch, actionType) => {
  const savedData = localStorage.getItem(key);
  const parsedData = savedData === null || savedData === "undefined" ? defaultValue : JSON.parse(savedData)
  dispatch({ type: actionType, payload: parsedData })
};