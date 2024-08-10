export const INITIAL_CLASS_MANAGER = {
  updatedClasses: [],
  classActivities: [],
  classList: [],
  emptyClassesList: [],
  classesForDay: [],
  dateSelected: new Date(),
  className: "",
  classByDate: null,
  activityToShow: "",

}

export function classManagerReducer(state = INITIAL_CLASS_MANAGER, action) {

  switch (action.type) {
    case 'INITIALIZE_CLASS_MANAGER':
      return {
        ...state,
        classList: action.payload.classList,
        emptyClassesList: action.payload.classList,
        classActivities: action.payload.classActivities,
        updatedClasses: action.payload.updatedClasses,
      };

    case 'SET_UPDATED_CLASSES':
      return {
        ...state,
        updatedClasses: action.payload,
      };

    case 'SET_CLASS_ACTIVITIES':
      return {
        ...state,
        classActivities: action.payload,
      };

    case 'SET_CLASS_LIST':
      return {
        ...state,
        classList: action.payload,
      };

    case 'UPDATE_CLASS_LIST':
      return {
        ...state,
        classList: [...state.classList, action.payload]
      }

    case 'REMOVE_CLASS_FROM_LIST':
      return {
        ...state,
        classList: state.classList.filter(classItem => classItem._id !== action.payload)
      }


    case 'SET_ACTIVITY_FOR_SELECTED_CLASS':
      return {
        ...state,
        classList: state.classList.map(classItem =>
          classItem.selected ? { ...classItem, activityObj: action.payload } : classItem
        ),
      }

    case 'SET_SELECTED_CLASS':
      return {
        ...state,
        classList: state.classList.map(classItem =>
          classItem._id === action.payload._id ? { ...classItem, selected: !classItem.selected } : classItem
        ),
      }


    case 'SET_REMOVE_CLASS_ACTIVITY':
      return {
        ...state,
        classList: state.classList.map(classItem =>
          classItem._id === action.payload._id ? { ...classItem, activityObj: null } : classItem
        ),
      }



    case 'DESELECT_ALL_CLASSES':
      return {
        ...state,
        classList: state.classList.map(classItem => ({ ...classItem, selected: false })),
      }


    case 'SET_EMPTY_CLASS_LIST':
      return {
        ...state,
        emptyClassList: action.payload,
      };

    case 'SET_CLASSES_FOR_DAY':
      return {
        ...state,
        classesForDay: action.payload,
      };


    case 'SET_DATE_SELECTED':
      return {
        ...state,
        dateSelected: action.payload,
      };

    case 'SET_CLASS_BY_DATE':
      return {
        ...state,
        classByDate: action.payload,
      };

    case 'SET_ACTIVITIES_TO_SHOW':
      return {
        ...state,
        activityToShow: action.payload,
      };

    case 'RESET_CLASS_MANAGER':
      return INITIAL_CLASS_MANAGER;

    default:
      return state;
  }
}
