export const INITIAL_MY_FINAL_ACTIVITY = {
  activitiesID: {
    gapFill: "",
    video: ""
  },
  date: "",
  id: "",
  title: "",
  questions: [],
  createdBy: ""
}

export function myFinalActivityReducer(state = INITIAL_MY_FINAL_ACTIVITY, action) {
  switch (action.type) {
    case 'UPDATE_FINAL_ACTIVITY':
      return {
        ...state,
        ...action.payload,
        activitiesID: {
          ...state.activitiesID,
          ...action.payload.activitiesID,
        }
      }
    case 'RESET_MY_FINAL_ACTIVITY':
      return INITIAL_MY_FINAL_ACTIVITY;
    default:
      return state;
  }
}