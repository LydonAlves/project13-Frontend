export const INITIAL_SPEAKING_CORRECTIONS = {
  allSpeakingCorrections: [],
  lastTenResults: [],
  currentItemIndex: 0,
  dateOfCorrections: ""
}

export function speakingCorrectionsReducer(state = INITIAL_SPEAKING_CORRECTIONS, action) {
  switch (action.type) {
    case 'SET_ALL_SPEAKING_CORRECTIONS':
      return {
        ...state,
        allSpeakingCorrections: action.payload,
      };

    case 'SET_LAST_TEN_RESULTS':
      return {
        ...state,
        lastTenResults: action.payload,
      };

    case 'INCREMENT_INDEX':
      return {
        ...state,
        currentItemIndex: state.currentItemIndex + 1,
      };

    case 'DECREMENT_INDEX':
      return {
        ...state,
        currentItemIndex: state.currentItemIndex - 1,
      };

    case 'SET_DATE_OF_CORRECTIONS':
      return {
        ...state,
        dateOfCorrections: action.payload,
      };

    case 'RESET_SPEAKING_CORRECTIONS':
      return INITIAL_SPEAKING_CORRECTIONS;

    default:
      return state;
  }
}