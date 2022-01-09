import { profileConstants } from "../actions/constants";

const initState = {
  profiles: null,
  profile: null,
  error: null,
  userByProfile: null,
  isGettingAll: false,
  isGetting: false,
  isAltering: false,
  isDropping: false,
  isGettingUserByProfile: false,
};
const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case profileConstants.GET_ALL_PROFILE_REQUEST:
      state = {
        ...state,
        isGettingAll: true,
        error: null,
      };
      break;
    case profileConstants.GET_ALL_PROFILE_SUCCESS:
      state = {
        ...state,
        isGettingAll: false,
        profiles: action.payload.profiles,
        error: null,
      };
      break;
    case profileConstants.GET_ALL_PROFILE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        isGettingAll: false,
        isGetting: false,
        isAltering: false,
        isDropping: false,
      };
      break;
    case profileConstants.GET_PROFILE_REQUEST:
      state = {
        ...state,
        isGetting: true,
        error: null,
      };
      break;
    case profileConstants.GET_PROFILE_SUCCESS:
      state = {
        ...state,
        profile: action.payload.profile,
        isGetting: false,
        error: null,
      };
      break;
    case profileConstants.GET_PROFILE_FAILURE:
      state = {
        ...state,
        isGetting: false,
        error: action.payload.error,
      };
      break;
    case profileConstants.ALTER_PROFILE_REQUEST:
      state = {
        ...state,
        isAltering: true,
        error: null,
      };
      break;
    case profileConstants.ALTER_PROFILE_SUCCESS:
      state = {
        ...state,
        isAltering: false,
        error: null,
      };
      break;
    case profileConstants.ALTER_PROFILE_FAILURE:
      state = {
        ...state,
        isAltering: false,
        error: action.payload.error,
      };
      break;
    case profileConstants.DROP_PROFILE_REQUEST:
      state = {
        ...state,
        isDropping: true,
        error: null,
      };
      break;
    case profileConstants.DROP_PROFILE_SUCCESS:
      state = {
        ...state,
        isDropping: false,
        error: null,
      };
      break;
    case profileConstants.DROP_PROFILE_FAILURE:
      state = {
        ...state,
        isDropping: false,
        error: action.payload.error,
      };
      break;
    case profileConstants.GET_USERS_BY_PROFILE_REQUEST:
      state = {
        ...state,
        isGettingUserByProfile: true,
        error: null,
      };
      break;
    case profileConstants.GET_USERS_BY_PROFILE_SUCCESS:
      state = {
        ...state,
        userByProfile: action.payload.userByProfile,
        isGettingUserByProfile: false,
        error: null,
      };
      break;
    case profileConstants.GET_USERS_BY_PROFILE_FAILURE:
      state = {
        ...state,
        isGettingUserByProfile: false,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};
export default profileReducer;
