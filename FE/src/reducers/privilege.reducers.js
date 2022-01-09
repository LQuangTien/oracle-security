import { privilegeConstants } from "../actions/constants";

const initState = {
  error: null,
  privileges: null,
  userByPriv: null,
  isGetPrivilege: false,
  isGetPrivilegeAdmin: false,
  adminPrivs: {
    rolePriv: null,
    tableCol: null,
  },
  isGettingUserByPriv: false,
};
const privilegeReducer = (state = initState, action) => {
  switch (action.type) {
    case privilegeConstants.GET_PRIVILEGE_REQUEST:
      state = {
        ...state,
        isGetPrivilege: true,
      };
      break;
    case privilegeConstants.GET_PRIVILEGE_SUCCESS:
      state = {
        ...state,
        privileges: action.payload.privileges,
        isGetPrivilege: false,
      };
      break;
    case privilegeConstants.GET_PRIVILEGE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        isGetPrivilege: false,
      };
      break;
    case privilegeConstants.GET_PRIVILEGE_ADMIN_REQUEST:
      state = {
        ...state,
        isGetPrivilegeAdmin: true,
      };
      break;
    case privilegeConstants.GET_PRIVILEGE_ADMIN_SUCCESS:
      state = {
        ...state,
        adminPrivs: action.payload.adminPrivs,
        isGetPrivilegeAdmin: false,
      };
      break;
    case privilegeConstants.GET_PRIVILEGE_ADMIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        isGetPrivilegeAdmin: false,
      };
      break;
    case privilegeConstants.GET_USERS_BY_PRIV_REQUEST:
      state = {
        ...state,
        isGettingUserByPriv: true,
        error: null,
      };
      break;
    case privilegeConstants.GET_USERS_BY_PRIV_SUCCESS:
      state = {
        ...state,
        userByPriv: action.payload.userByPriv,
        isGettingUserByPriv: false,
        error: null,
      };
      break;
    case privilegeConstants.GET_USERS_BY_PRIV_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        isGettingUserByPriv: false,
      };
      break;
    default:
      break;
  }
  return state;
};
export default privilegeReducer;
