export const INITIAL_EXERCISE_STATE = {
  savedFinalExercise: "",
  ruleList: [],
  stepId: [],
  currentStep: "",
  exerciseType: "",
  initialInputs: [],
  inputsToFill: [],
  videoData: "",
  gapIndex: null,
}

export function exerciseReducer(state = initialState, action) {

  switch (action.type) {
    case 'SET_SAVED_FINAL_EXERCISE':
      return {
        ...state,
        savedFinalExercise: action.payload,
      }

    case 'CREATE_EXERCISE_PAGE_VALUES':
      return {
        ...state,
        ...action.payload,
      }

    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
      }

    case 'SET_INITIAL_INPUTS':
      return {
        ...state,
        initialInputs: [action.payload],
      }

    case 'UPDATE_INPUT_TEXT':
      return {
        ...state,
        inputsToFill: state.inputsToFill.map((input, index) =>
          index === action.payload.index
            ? { ...input, answer: action.payload.text }
            : input
        ),
      }


    case 'UPDATE_INPUT':
      const index = state.inputsToFill.findIndex(input => input.id === action.payload.gapIndex);

      if (index === -1) {
        console.error(`No item found with id: ${action.payload.gapIndex}`);
        return state;
      }
      const updatedInputs = [...state.inputsToFill];
      updatedInputs[index] = { ...updatedInputs[index], rule: action.payload.rule };
      return { ...state, inputsToFill: updatedInputs };

    case 'SET_STEP_OF_PROCESS':
      return {
        ...state,
        stepId: [action.payload],
      }

    case 'SET_VIDEO_DATA':
      return { ...state, videoData: action.payload };

    case 'SET_GAP_INDEX':
      return { ...state, gapIndex: action.payload };

    case 'RESET_CREATE_EXERCISE_STATE':
      return INITIAL_EXERCISE_STATE;


    default:
      return state;
  }
}

