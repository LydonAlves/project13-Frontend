export const findMostRecentActivity = (activities) => {
  const now = new Date()
  let selectedActivity = []
  const mostRecentActivity = activities.reduce((latest, item) => {
    const itemDate = new Date(item.date)
    const latestDate = new Date(latest.date)

    if (itemDate <= now) {
      return itemDate > latestDate ? item : latest
    }

    return latest
  })
  selectedActivity = [mostRecentActivity]
  return selectedActivity
}