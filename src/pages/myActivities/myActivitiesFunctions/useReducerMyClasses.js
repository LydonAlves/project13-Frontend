export const UPDATE_ACTIVITIES_CHOSEN = {
  activities: {
    video: "",
    gapFill: ""
  }
}

export const assignActivityToClass = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ACTIVITIES_CHOSEN':
      return {
        ...state,
        activities: {
          ...state.activities,
          ...action.payload
        }
      }
    default:
      throw new Error('Unhandled action type:' + action.type)
  }
} 