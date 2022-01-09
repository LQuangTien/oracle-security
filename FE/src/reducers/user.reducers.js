import { userConstants } from "../actions/constants";

const initState = {
  users: null,
  user: null,
  currentUser: null,
  error: null,
  isGettingAll: false,
  isGetting: false,
  isAltering: false,
  isDropping: false,
  isGettingCurrentUser: false,
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_ALL_USER_REQUEST:
      state = {
        ...state,
        isGettingAll: true,
        error: null,
      };
      break;
    case userConstants.GET_ALL_USER_SUCCESS:
      state = {
        ...state,
        isGettingAll: false,
        users: action.payload.users,
        error: null,
      };
      break;
    case userConstants.GET_ALL_USER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        isGettingAll: false,
        isGetting: false,
        isAltering: false,
        isDropping: false,
      };
      break;
    case userConstants.GET_USER_REQUEST:
      state = {
        ...state,
        isGetting: true,
        error: null,
      };
      break;
    case userConstants.GET_USER_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        isGetting: false,
        error: null,
      };
      break;
    case userConstants.GET_USER_FAILURE:
      state = {
        ...state,
        isGetting: false,
        error: action.payload.error,
      };
      break;
    case userConstants.ALTER_USER_REQUEST:
      state = {
        ...state,
        isAltering: true,
        error: null,
      };
      break;
    case userConstants.ALTER_USER_SUCCESS:
      state = {
        ...state,
        isAltering: false,
        error: null,
      };
      break;
    case userConstants.ALTER_USER_FAILURE:
      state = {
        ...state,
        isAltering: false,
        error: action.payload.error,
      };
      break;
    case userConstants.DROP_USER_REQUEST:
      state = {
        ...state,
        isDropping: true,
        error: null,
      };
      break;
    case userConstants.DROP_USER_SUCCESS:
      state = {
        ...state,
        isDropping: false,
        error: null,
      };
      break;
    case userConstants.DROP_USER_FAILURE:
      state = {
        ...state,
        isDropping: false,
        error: action.payload.error,
      };
      break;
    case userConstants.GET_CURRENT_USER_REQUEST:
      state = {
        ...state,
        isGettingCurrentUser: true,
        error: null,
      };
      break;
    case userConstants.GET_CURRENT_USER_SUCCESS:
      state = {
        ...state,
        isGettingCurrentUser: false,
        currentUser: action.payload.currentUser,
        error: null,
      };
      break;
    case userConstants.GET_CURRENT_USER_FAILURE:
      state = {
        ...state,
        isGettingCurrentUser: false,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};
export default userReducer;
