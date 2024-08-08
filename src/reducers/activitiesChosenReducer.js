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
    case 'RESET_ACTIVITIES_CHOSEN':
      return UPDATE_ACTIVITIES_CHOSEN;
    default:
      throw new Error('Unhandled action type:' + action.type)
  }
} 