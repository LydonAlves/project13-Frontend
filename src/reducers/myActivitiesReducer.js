export const INITIAL_MY_ACTIVITIES_PAGE = {
  savedActivity: null,
  showSelectedTask: "",
  question: "",
  title: null,
  video: "",
  gapfill: "",
  currentStep: 0,
  gapFillExercises: [],
  youTubeExercises: [],
  questionList: [],
  activityType: [],
}

export function myActivitiesReducer(state = INITIAL_MY_ACTIVITIES_PAGE, action) {
  switch (action.type) {
    case 'SET_SAVED_ACTIVITY':
      return {
        ...state,
        savedActivity: action.payload,
      }

    case 'SET_SHOW_SELECTED_TASK':
      return {
        ...state,
        showSelectedTask: action.payload,
      }

    case 'SET_ACTIVITY_TYPE_SELECTED':
      return {
        ...state,
        activityTypeSelected: action.payload,
      }

    case 'SET_QUESTION':
      return {
        ...state,
        question: action.payload,
      }

    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload,
      }

    case 'SET_VIDEO':
      return {
        ...state,
        video: action.payload,
      }

    case 'SET_GAPFILL':
      return {
        ...state,
        gapfill: action.payload,
      }

    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
      }

    case 'SET_SELECTED_ID':
      return {
        ...state,
        selectedId: action.payload,
      }

    case 'SET_GAP_FILL_EXERCISES':
      return {
        ...state,
        gapFillExercises: action.payload,
      }

    case 'SET_YOUTUBE_EXERCISES':
      return {
        ...state,
        youTubeExercises: action.payload,
      }

    case 'ADD_QUESTION_TO_LIST':
      return {
        ...state,
        questionList: [...state.questionList, action.payload],
      }

    case 'REMOVE_QUESTION_FROM_LIST':
      return {
        ...state,
        questionList: state.questionList.filter(
          question => question.id !== action.payload
        ),
      }

    case 'SET_ACTIVITY_TYPE':
      return {
        ...state,
        activityType: action.payload,
      }

    case 'RESET_MY_ACTIVITIES':
      return INITIAL_MY_ACTIVITIES_PAGE;
    default:
      return state;
  }
}