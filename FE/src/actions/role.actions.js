import axios from "../helpers/axios";
import { roleConstants } from "./constants";

export const getAllRole = () => {
  return async (dispatch) => {
    dispatch({ type: roleConstants.GET_ALL_ROLE_REQUEST });
    try {
      const res = await axios.get("tableInfo/getAllRole");
      const roles = res.data.data;
      dispatch({
        type: roleConstants.GET_ALL_ROLE_SUCCESS,
        payload: { roles },
      });
    } catch (error) {
      dispatch({
        type: roleConstants.GET_ALL_ROLE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const addRole = (role) => {
  return async (dispatch) => {
    try {
      await axios.post("/role/create", role).then(() => {
        getAllRole();
      });
    } catch (error) {
      dispatch({
        type: roleConstants.GET_ALL_ROLE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const alterRole = (profile) => {
  return async (dispatch) => {
    dispatch({
      type: roleConstants.ALTER_ROLE_REQUEST,
    });
    try {
      await axios.put("role/", profile).then(() => {
        getAllRole();
        dispatch({
          type: roleConstants.ALTER_ROLE_SUCCESS,
        });
      });
    } catch (error) {
      dispatch({
        type: roleConstants.GET_ALL_ROLE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const dropRole = (role) => {
  return async (dispatch) => {
    dispatch({
      type: roleConstants.DROP_ROLE_REQUEST,
    });
    try {
      await axios.delete(`role/${role}`).then(() => {
        getAllRole();
        dispatch({
          type: roleConstants.DROP_ROLE_SUCCESS,
        });
      });
    } catch (error) {
      dispatch({
        type: roleConstants.GET_ALL_ROLE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const grantRolePriv = (rolePriv) => {
  return async (dispatch) => {
    dispatch({
      type: roleConstants.GRANT_ROLE_PRIV_REQUEST,
    });
    try {
      await axios.post("/role/grantRolesOrSysPrivs", rolePriv);
      dispatch({
        type: roleConstants.GRANT_ROLE_PRIV_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: roleConstants.GRANT_ROLE_PRIV_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const revokeRolePriv = (rolePriv) => {
  return async (dispatch) => {
    dispatch({
      type: roleConstants.REVOKE_ROLE_PRIV_REQUEST,
    });
    try {
      await axios.post("/role/revokeRolesOrSysPrivs", rolePriv);
      dispatch({
        type: roleConstants.REVOKE_ROLE_PRIV_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: roleConstants.REVOKE_ROLE_PRIV_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getAllPrivByRole = (role) => {
  return async (dispatch) => {
    dispatch({ type: roleConstants.GET_ALL_PRIV_BY_ROLE_REQUEST });
    try {
      const res = await axios.get(`/tableInfo/getAllPrivsByRole/${role}`);
      const allPrivByRole = res.data.data;
      dispatch({
        type: roleConstants.GET_ALL_PRIV_BY_ROLE_SUCCESS,
        payload: { allPrivByRole },
      });
    } catch (error) {
      dispatch({
        type: roleConstants.GET_ALL_PRIV_BY_ROLE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getAllUserByRole = (role) => {
  return async (dispatch) => {
    dispatch({ type: roleConstants.GET_ALL_USER_BY_ROLE_REQUEST });
    try {
      const res = await axios.get(`/tableInfo/getAllUsersByRole/${role}`);
      const allUserByRole = res.data.data;
      dispatch({
        type: roleConstants.GET_ALL_USER_BY_ROLE_SUCCESS,
        payload: { allUserByRole },
      });
    } catch (error) {
      dispatch({
        type: roleConstants.GET_ALL_USER_BY_ROLE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getAllRoleByUser = () => {
  return async (dispatch) => {
    dispatch({ type: roleConstants.GET_ALL_ROLE_BY_USER_REQUEST });
    try {
      const res = await axios.get(`/tableInfo/getUserInfoByUserConnection`);
      const userRole = res.data.data.roles;
      dispatch({
        type: roleConstants.GET_ALL_ROLE_BY_USER_SUCCESS,
        payload: { userRole },
      });
    } catch (error) {
      dispatch({
        type: roleConstants.GET_ALL_ROLE_BY_USER_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};


export const grantTable = (rolePriv) => {
  return async (dispatch) => {
    dispatch({
      type: roleConstants.GRANT_ROLE_PRIV_REQUEST,
    });
    try {
      await axios.post("/role/grantTabOrColPrivs", rolePriv);
      dispatch({
        type: roleConstants.GRANT_ROLE_PRIV_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: roleConstants.GRANT_ROLE_PRIV_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const revokeTable = (rolePriv) => {
  return async (dispatch) => {
    dispatch({
      type: roleConstants.REVOKE_ROLE_PRIV_REQUEST,
    });
    try {
      await axios.post("/role/revokeTabOrColPrivs", rolePriv);
      dispatch({
        type: roleConstants.REVOKE_ROLE_PRIV_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: roleConstants.REVOKE_ROLE_PRIV_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};