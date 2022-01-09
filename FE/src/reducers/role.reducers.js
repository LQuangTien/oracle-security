import { roleConstants } from "../actions/constants";

const initState = {
  roles: null,
  role: null,
  error: null,
  allPrivByRole: null,
  allUserByRole: null,
  userRole: null,
  isGettingAll: false,
  isGetting: false,
  isAltering: false,
  isDropping: false,
  isGranting: false,
  isRevoking: false,
  isGettingAllPrivByRole: false,
  isGettingAllUserByRole: false,
  isGettingUserRole: false,
};
const roleReducer = (state = initState, action) => {
  switch (action.type) {
    case roleConstants.GET_ALL_ROLE_REQUEST:
      state = {
        ...state,
        isGettingAll: true,
        error: null,
      };
      break;
    case roleConstants.GET_ALL_ROLE_SUCCESS:
      state = {
        ...state,
        isGettingAll: false,
        roles: action.payload.roles,
        error: null,
      };
      break;
    case roleConstants.GET_ALL_ROLE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        isGettingAll: false,
        isGetting: false,
        isAltering: false,
        isDropping: false,
      };
      break;
    case roleConstants.GET_ROLE_REQUEST:
      state = {
        ...state,
        isGetting: true,
        error: null,
      };
      break;
    case roleConstants.GET_ROLE_SUCCESS:
      state = {
        ...state,
        role: action.payload.role,
        isGetting: false,
        error: null,
      };
      break;
    case roleConstants.GET_ROLE_FAILURE:
      state = {
        ...state,
        isGetting: false,
        error: action.payload.error,
      };
      break;
    case roleConstants.ALTER_ROLE_REQUEST:
      state = {
        ...state,
        isAltering: true,
        error: null,
      };
      break;
    case roleConstants.ALTER_ROLE_SUCCESS:
      state = {
        ...state,
        isAltering: false,
        error: null,
      };
      break;
    case roleConstants.ALTER_ROLE_FAILURE:
      state = {
        ...state,
        isAltering: false,
        error: action.payload.error,
      };
      break;
    case roleConstants.DROP_ROLE_REQUEST:
      state = {
        ...state,
        isDropping: true,
        error: null,
      };
      break;
    case roleConstants.DROP_ROLE_SUCCESS:
      state = {
        ...state,
        isDropping: false,
        error: null,
      };
      break;
    case roleConstants.DROP_ROLE_FAILURE:
      state = {
        ...state,
        isDropping: false,
        error: action.payload.error,
      };
      break;
    case roleConstants.GRANT_ROLE_PRIV_REQUEST:
      state = {
        ...state,
        isGranting: true,
        error: null,
      };
      break;
    case roleConstants.GRANT_ROLE_PRIV_SUCCESS:
      state = {
        ...state,
        isGranting: false,
        error: null,
      };
      break;
    case roleConstants.GRANT_ROLE_PRIV_FAILURE:
      state = {
        ...state,
        isGranting: false,
        error: action.payload.error,
      };
      break;
    case roleConstants.REVOKE_ROLE_PRIV_REQUEST:
      state = {
        ...state,
        isRevoking: true,
        error: null,
      };
      break;
    case roleConstants.REVOKE_ROLE_PRIV_SUCCESS:
      state = {
        ...state,
        isRevoking: false,
        error: null,
      };
      break;
    case roleConstants.REVOKE_ROLE_PRIV_FAILURE:
      state = {
        ...state,
        isRevoking: false,
        error: action.payload.error,
      };
      break;
    case roleConstants.GET_ALL_PRIV_BY_ROLE_REQUEST:
      state = {
        ...state,
        isGettingAllPrivByRole: true,
        error: null,
      };
      break;
    case roleConstants.GET_ALL_PRIV_BY_ROLE_SUCCESS:
      state = {
        ...state,
        allPrivByRole: action.payload.allPrivByRole,
        isGettingAllPrivByRole: false,
        error: null,
      };
      break;
    case roleConstants.GET_ALL_PRIV_BY_ROLE_FAILURE:
      state = {
        ...state,
        isGettingAllPrivByRole: false,
        error: action.payload.error,
      };
      break;
    case roleConstants.GET_ALL_USER_BY_ROLE_REQUEST:
      state = {
        ...state,
        isGettingAllUserByRole: true,
        error: null,
      };
      break;
    case roleConstants.GET_ALL_USER_BY_ROLE_SUCCESS:
      state = {
        ...state,
        isGettingAllUserByRole: false,
        allUserByRole: action.payload.allUserByRole,
        error: null,
      };
      break;
    case roleConstants.GET_ALL_USER_BY_ROLE_FAILURE:
      state = {
        ...state,
        isGettingAllUserByRole: false,
        error: action.payload.error,
      };
      break;
    case roleConstants.GET_ALL_ROLE_BY_USER_REQUEST:
      state = {
        ...state,
        isGettingUserRole: true,
        error: null,
      };
      break;
    case roleConstants.GET_ALL_ROLE_BY_USER_SUCCESS:
      state = {
        ...state,
        isGettingUserRole: false,
        userRole: action.payload.userRole,
        error: null,
      };
      break;
    case roleConstants.GET_ALL_ROLE_BY_USER_FAILURE:
      state = {
        ...state,
        isGettingUserRole: false,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};
export default roleReducer;
