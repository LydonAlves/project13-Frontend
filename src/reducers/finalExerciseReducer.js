export const INITIAL_FINAL_EXERCISE_STATE = {
  answers: [],
  dateCreated: "",
  video: {
    opts: {
      videoId: "",
    },
  },
  textObj: { text: "", title: "" },
  createdBy: "",

};

export function finalExerciseReducer(state = INITIAL_FINAL_EXERCISE_STATE, action) {

  switch (action.type) {
    case 'UPDATE_FINAL_EXERCISE':
      return {
        ...state,
        ...action.payload,
        textObj: {
          ...state.textObj,
          ...action.payload.textObj,
        },
        video: {
          ...state.video,
          opts: {
            ...state.video.opts,
            ...action.payload.video?.opts,
          }
        },
      };

    case 'RESET_FINAL_EXERCISE_STATE':
      return INITIAL_FINAL_EXERCISE_STATE;

    default:
      return state;
  }


}