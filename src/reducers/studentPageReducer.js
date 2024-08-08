export const INITIAL_STUDENT_PAGE = {
  allActivities: [],
  answersVideo: [],
  answersGapFill: [],
  infoForExplanation: [],
  videoObj: "",
  gapFill: "",
  gapFillVideo: "",
  questions: "",
  chosenDate: "",
  activityType: "youTubeFillGap"
}

export function studentPageReducer(state = INITIAL_STUDENT_PAGE, action) {
  switch (action.type) {

    case 'SET_ALL_ACTIVITIES':
      return {
        ...state,
        allActivities: [action.payload],
      }

    case 'SET_ANSWERS_VIDEO':
      return { ...state, answersVideo: action.payload }

    case 'SET_ANSWERS_GAPFILL':
      return { ...state, answersGapFill: action.payload }

    case 'UPDATE_ANSWERS_VIDEO':
      return {
        ...state,
        answersVideo: [
          ...state.answersVideo,
          { number: action.payload.index, answer: action.payload.value }
        ]
      }

    case 'UPDATE_ANSWERS_GAPFILL':
      return {
        ...state,
        answersGapFill: state.inputs.map((input, idx) =>
          idx === action.payload.index
            ? { ...input, number: action.payload.index, answer: action.payload.value }
            : input
        )
      }

    case 'SET_INFO_FOR_EXPLANATION':
      return {
        ...state,
        infoForExplanation: action.payload,
      }

    case 'SET_VIDEO_OBJ':
      return {
        ...state,
        videoObj: action.payload,
      }

    case 'SET_VIDEO_OPTS':
      return {
        ...state,
        videoOpts: action.payload,
      }

    case 'SET_GAP_FILL':
      return {
        ...state,
        gapFill: action.payload,
      }

    case 'SET_GAP_FILL_VIDEO':
      return {
        ...state,
        gapFillVideo: action.payload,
      }

    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
      }

    case 'SET_CHOSEN_DATE':
      return {
        ...state,
        chosenDate: action.payload,
      }

    case 'SET_ACTIVITY_TYPE':
      return {
        ...state,
        activityType: action.payload,
      }

    case 'RESET_STUDENT_PAGE':
      return INITIAL_STUDENT_PAGE;

    default:
      return state;
  }
}