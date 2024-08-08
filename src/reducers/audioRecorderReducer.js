export const INITIAL_AUDIO_RECORDER = {
  recordingStatus: "inactive",
  stream: null,
  audio: null,
  audioFile: null,
  currentItemIndex: 0,
  answersToShow: null,
  permission: false,
  audioChunks: [],
  todaysCorrections: [],
  correctedTextArray: []
}

export const audioRecorderReducer = (state = INITIAL_AUDIO_RECORDER, action) => {

  switch (action.type) {
    case 'START_RECORDING':
      return {
        ...state,
        recordingStatus: "recording",
        audioChunks: action.payload.audioChunks
      };

    case 'STOP_RECORDING':
      return {
        ...state,
        recordingStatus: "inactive",
        audio: action.payload.audioFile,
        audioFile: action.payload.audioFile,
        audioChunks: []
      };

    case 'SET_PERMISSION':
      return {
        ...state,
        stream: action.payload,
        permission: true
      }

    case 'RESET_AUDIO':
      return {
        ...state,
        audio: null
      }

    case 'INCREMENT_INDEX':
      return {
        ...state,
        currentItemIndex: state.currentItemIndex + 1,
      };

    case 'DECREMENT_INDEX':
      return {
        ...state,
        currentItemIndex: state.currentItemIndex - 1,
      }

    case 'SET_ANSWERS_TO_SHOW':
      return {
        ...state,
        answersToShow: action.payload
      }

    case 'SET_TODAYS_CORRECTIONS':
      return {
        ...state,
        todaysCorrections: action.payload
      }

    case 'ADD_TO_CORRECTED_TEXT_ARRAY':
      return {
        ...state,
        correctedTextArray: [...state.correctedTextArray, action.payload]
      };

    case 'RESET_RECORDER':
      return INITIAL_AUDIO_RECORDER;

    default:
      return state;
  }
};