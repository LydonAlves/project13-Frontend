export const addActtivityToClassesFunction = (activityTypeSelected, dispatachActivities, activity) => {
  if (activityTypeSelected === "video") {
    dispatachActivities({
      type: "UPDATE_ACTIVITIES_CHOSEN",
      payload: {
        video: activity
      }
    })
  } else if (activityTypeSelected === "gapFill") {
    dispatachActivities({
      type: "UPDATE_ACTIVITIES_CHOSEN",
      payload: {
        gapFill: activity
      }
    })
  }
}