export const INITIAL_VIDEO_STATE = {
  opts: {
    width: "500px",
    height: "300px",
    borderRadius: "",
    videoId: "",
    playerVars: {
      autoplay: 0,
      start: 0,
      end: 0,
    },
  },

  chosenTimes: {
    startTimeSaved: 0,
    endTimeSaved: 0
  }
}

export const videoReducer = (state, action) => {

  switch (action.type) {
    case 'UPDATE_VIDEO_PARAMS':
      return {
        ...state,
        opts: {
          ...state.opts,
          ...action.payload
        }
      }

    case 'UPDATE_CHOSEN_TIMES':
      return {
        ...state,
        chosenTimes: {
          ...state.chosenTimes,
          ...action.payload
        }
      }
    default:
      throw new Error('Unhandled action type:' + action.type)
  }
}

