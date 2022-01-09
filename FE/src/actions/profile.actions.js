import axios from "../helpers/axios";
import { profileConstants } from "./constants";

export const getAllProfile = () => {
  return async (dispatch) => {
    dispatch({ type: profileConstants.GET_ALL_PROFILE_REQUEST });
    try {
      const res = await axios.get("tableInfo/getAllProfiles");
      const profiles = res.data.data;
      dispatch({
        type: profileConstants.GET_ALL_PROFILE_SUCCESS,
        payload: { profiles },
      });
    } catch (error) {
      dispatch({
        type: profileConstants.GET_ALL_PROFILE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getProfile = (profileName) => {
  return async (dispatch) => {
    dispatch({ type: profileConstants.GET_PROFILE_REQUEST });
    try {
      const res = await axios.get(`/tableInfo/getProfileInfo/${profileName}`);
      const profile = res.data.data;
      dispatch({
        type: profileConstants.GET_PROFILE_SUCCESS,
        payload: { profile },
      });
    } catch (error) {
      dispatch({
        type: profileConstants.GET_PROFILE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const addProfile = (profile) => {
  return async (dispatch) => {
    try {
      await axios.post("/profile/create", profile).then(() => {
        getAllProfile();
      });
    } catch (error) {
      dispatch({
        type: profileConstants.GET_ALL_PROFILE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const alterProfile = (profile) => {
  return async (dispatch) => {
    dispatch({
      type: profileConstants.ALTER_PROFILE_REQUEST,
    });
    try {
      await axios.put("profile/", profile).then(() => {
        getAllProfile();
        dispatch({
          type: profileConstants.ALTER_PROFILE_SUCCESS,
        });
      });
    } catch (error) {
      dispatch({
        type: profileConstants.GET_ALL_PROFILE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const dropProfile = (profile) => {
  return async (dispatch) => {
    dispatch({
      type: profileConstants.DROP_PROFILE_REQUEST,
    });
    try {
      await axios.delete(`profile/${profile}`).then(() => {
        getAllProfile();
        dispatch({
          type: profileConstants.DROP_PROFILE_SUCCESS,
        });
      });
    } catch (error) {
      dispatch({
        type: profileConstants.GET_ALL_PROFILE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getUsersByProfile = (profileName) => {
  return async (dispatch) => {
    dispatch({ type: profileConstants.GET_USERS_BY_PROFILE_REQUEST });
    try {
      const res = await axios.get(`/tableInfo/getAllUsersByProfile/${profileName}`);
      const userByProfile = res.data.data;
      dispatch({
        type: profileConstants.GET_USERS_BY_PROFILE_SUCCESS,
        payload: { userByProfile },
      });
    } catch (error) {
      dispatch({
        type: profileConstants.GET_USERS_BY_PROFILE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};