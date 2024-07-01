export const findActivityObjById = (dataArray, selectedID) => {
  const matchingActivityObjs = [];
  for (const item of dataArray) {
    console.log("first item", item);
    for (const classItem of item.classes) {
      if (classItem._id === selectedID) {
        matchingActivityObjs.push(classItem.activityObj);
      }
    }
  }
  return matchingActivityObjs;
};