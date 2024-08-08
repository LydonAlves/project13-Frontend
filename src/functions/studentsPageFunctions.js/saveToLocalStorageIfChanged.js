export const saveToLocalStorageIfChanged = (key, newValue) => {
  const savedValue = localStorage.getItem(key)

  const savedValueParsed = savedValue === null || savedValue === 'undefined' ? null : JSON.parse(savedValue);

  if (JSON.stringify(savedValueParsed) !== JSON.stringify(newValue)) {
    localStorage.setItem(key, JSON.stringify(newValue));
  }
};