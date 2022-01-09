import axios from "../helpers/axios";
import { authConstants, privilegeConstants, userConstants } from "./constants";

// export const signup = (user) => {
//   return async (dispatch) => {
//     dispatch({ type: userConstants.REGISTER_REQUEST });
//     const res = await axios.post("/admin/signup", { ...user });
//     if (res.status === 201) {
//       const { email } = res.data;
//       dispatch({
//         type: userConstants.REGISTER_SUCCESS,
//         payload: { message: email + " is registered completely!" },
//       });
//     } else {
//       dispatch({
//         type: userConstants.REGISTER_FAILURE,
//         payload: { error: res.data.error },
//       });
//     }
//   };
// };

export const getAllUser = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_ALL_USER_REQUEST });
    try {
      const res = await axios.get("tableInfo/getAllUser");
      const users = res.data.data;
      dispatch({
        type: userConstants.GET_ALL_USER_SUCCESS,
        payload: { users },
      });
    } catch (error) {
      dispatch({
        type: userConstants.GET_ALL_USER_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getUser = (username) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_REQUEST });
    try {
      const res = await axios.get(`/tableInfo/getUserByUsername/${username}`);
      const user = res.data.data;
      dispatch({
        type: userConstants.GET_USER_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      dispatch({
        type: userConstants.GET_USER_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      await axios.post("user/create", user).then(() => {
        getAllUser();
      });
    } catch (error) {
      dispatch({
        type: userConstants.GET_ALL_USER_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const alterUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.ALTER_USER_REQUEST,
    });
    try {
      await axios.put("user/", user).then(() => {
        getAllUser();
        dispatch({
          type: userConstants.ALTER_USER_SUCCESS,
        });
      });
    } catch (error) {
      dispatch({
        type: userConstants.GET_ALL_USER_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const dropUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: userConstants.DROP_USER_REQUEST,
    });
    try {
      await axios.delete(`user/${user}`).then(() => {
        getAllUser();
        dispatch({
          type: userConstants.DROP_USER_SUCCESS,
        });
      });
    } catch (error) {
      dispatch({
        type: userConstants.GET_ALL_USER_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getPrivilegeByUser = () => {
  return async (dispatch) => {
    dispatch({ type: privilegeConstants.GET_PRIVILEGE_REQUEST });
    try {
      const res = await axios.get(`/tableInfo/getUserInfoByUserConnection`);
      const privileges = res.data.data.privs;
      dispatch({
        type: privilegeConstants.GET_PRIVILEGE_SUCCESS,
        payload: { privileges },
      });
    } catch (error) {
      dispatch({
        type: privilegeConstants.GET_PRIVILEGE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getPrivilegeAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: privilegeConstants.GET_PRIVILEGE_ADMIN_REQUEST });
    try {
      const res = await axios.get(`/admin-privs`);
      dispatch({
        type: privilegeConstants.GET_PRIVILEGE_ADMIN_SUCCESS,
        payload: {
          adminPrivs: {
            rolePriv: res.data.data.SYS_PRIVS,
            tableCol: ["SELECT", "INSERT", "UPDATE", "DELETE"],
          },
        },
      });
    } catch (error) {
      dispatch({
        type: privilegeConstants.GET_PRIVILEGE_ADMIN_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getUserInfo = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_CURRENT_USER_REQUEST });
    try {
      const res = await axios.get(`/tableInfo/getUserInfoByUserConnection`);
      let currentUser = null;
      if (res.data && res.data.data && res.data.data.userInfo) {
        currentUser = res.data.data.userInfo;
      }
      dispatch({
        type: userConstants.GET_CURRENT_USER_SUCCESS,
        payload: { currentUser },
      });
    } catch (error) {
      dispatch({
        type: userConstants.GET_CURRENT_USER_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getUserByPriv = () => {
  return async (dispatch) => {
    dispatch({ type: privilegeConstants.GET_USERS_BY_PRIV_REQUEST });
    try {
      const res = await axios.get(`/tableInfo/getAllPrivileges`);
      dispatch({
        type: privilegeConstants.GET_USERS_BY_PRIV_SUCCESS,
        payload: {
          userByPriv: res.data.data,
        },
      });
    } catch (error) {
      dispatch({
        type: privilegeConstants.GET_USERS_BY_PRIV_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};
