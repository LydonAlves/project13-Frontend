export const INITIAL_LOGIN_REGISTER = {
  country: "",
  userName: "",
  email: "",
  password: "",
  repeatPassword: "",
  userLoggedIn: "",
  registrationData: ""
}

export function loginRegisterReducer(state = INITIAL_LOGIN_REGISTER, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.payloadKey]: action.payload.value
      }

    case 'SET_REGISTRATION_DATA':
      return {
        ...state,
        registrationData: action.payload
      }

    case 'SET_COUNTRY':
      return {
        ...state,
        country: action.payload,
      }

    case 'SET_USER_LOGGED_IN':
      return {
        ...state,
        userLoggedIn: action.payload,
      }

    case 'RESET_LOGIN_REGISTER':
      return INITIAL_LOGIN_REGISTER;

    default:
      return state;
  }
}