export const INITIAL_GAPFILL = {
  answerList: [],
  textAndTitle: "",
}

export const gapFillReducer = (state = INITIAL_GAPFILL, action) => {

  switch (action.type) {
    case "SET_UP_GAPFILL":
      return {
        answerList: action.payload.answers,
        textAndTitle: action.payload.textAndTitle
      }
    case 'SET_MANAGE_INPUTS':
      return {
        ...state,
        manageInputs: action.payload,
      }
    case SET_SHOW_EXPLANATION_INDEX:
      return {
        showExplanationIndex: true,
      };
    case RESET_GAPFILL:
      return INITIAL_GAPFILL;
    default:
      return state;
  }
};
