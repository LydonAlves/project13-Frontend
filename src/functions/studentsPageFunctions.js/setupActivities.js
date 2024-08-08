import { formatDate } from "../../context/DateContext"

export const setupActivities = (dispatchStudentsPage, activityCreatedId, allActivities) => {
  const now = new Date()

  const mostRecentActivity = activityCreatedId ? allActivities[0] : allActivities.reduce((latest, item) => {
    const itemDate = new Date(item.date)
    const latestDate = new Date(latest.date)
    return (itemDate <= now && itemDate > latestDate) ? item : latest;
  })

  const { activitiesID, date, questions } = mostRecentActivity || {}
  const { video, gapFill } = activitiesID || {}
  const videoObj = video ? video.video : null
  if (video) {
    const optsObj = {
      borderRadius: videoObj.opts.borderRadius,
      height: '200',
      width: '320',
      playerVars: videoObj.opts.playerVars
    }

    const chosenText = {
      textObj: video.textObj,
      answers: video.answers
    }

    dispatchStudentsPage({ type: 'SET_VIDEO_OPTS', payload: optsObj })
    dispatchStudentsPage({ type: 'SET_VIDEO_OBJ', payload: videoObj })
    dispatchStudentsPage({ type: 'SET_GAP_FILL_VIDEO', payload: chosenText })
  }

  if (gapFill) {
    dispatchStudentsPage({ type: 'SET_GAP_FILL', payload: gapFill })
  }

  if (questions) {
    dispatchStudentsPage({ type: 'SET_QUESTIONS', payload: questions })
  }

  dispatchStudentsPage({ type: 'SET_CHOSEN_DATE', payload: formatDate(date) })
}