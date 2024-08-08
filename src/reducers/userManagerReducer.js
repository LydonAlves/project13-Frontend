export const INITIAL_USER_MANAGER = {
  users: [],
  teachers: [],
  students: [],
  classGroups: [],
  studentsInGroup: [],
  userRoleSelected: "teacher",
  selectedUser: null,
  selectedGroup: ""
}

export function userManagerReducer(state = INITIAL_USER_MANAGER, action) {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      }

    case 'SET_TEACHERS':
      return {
        ...state,
        teachers: action.payload,
      }

    case 'SET_STUDENTS':
      return {
        ...state,
        students: action.payload,
      }

    case 'SET_CLASS_GROUPS':
      return {
        ...state,
        classGroups: action.payload,
      }

    case 'SET_STUDENTS_IN_GROUP':
      return {
        ...state,
        studentsInGroup: action.payload,
      }

    case 'SET_USER_ROLE_SELECTED':
      return {
        ...state,
        userRoleSelected: action.payload,
      }

    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
      }

    case 'SET_SELECTED_GROUP':
      return {
        ...state,
        selectedGroup: action.payload,
      }

    case 'RESET_USER_MANAGER':
      return INITIAL_USER_MANAGER;

    default:
      return state;
  }
}