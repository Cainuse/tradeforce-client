import {
  REMOVE_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  UPDATE_ALL_NOTIFICATIONS,
  GET_NOTIFICATIONS,
} from "../constants/actionTypes";
import axios from "axios";

import { displayError } from "./snackbarActions";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/notifications`;

export const getNotifications = (notifications) => {
  return {
    type: GET_NOTIFICATIONS,
    notifications,
  };
};

export const getNotificationsAsync = (userId) => {
  return async (dispatch) => {
    try {
      const myNotifications = await axios.get(
        `${BASE_URL}/findByUserId/${userId}`
      );
      return dispatch(getNotifications(myNotifications.data));
    } catch (err) {
      // error occurred while saving notification in db
      return dispatch(displayError(err.response.data.message));
    }
  };
};

export const removeNotification = (_id) => {
  return {
    type: REMOVE_NOTIFICATION,
    _id,
  };
};

export const removeNotificationAsync = (_id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/removeOneNotification/${_id}`);
      return dispatch(removeNotification(_id));
    } catch (err) {
      // error occurred while deleting notification in db
      return dispatch(displayError(err.response.data.message));
    }
  };
};

export const removeAllNotifications = () => {
  return {
    type: REMOVE_ALL_NOTIFICATIONS,
  };
};

// all notifications refers to all notifications belonging to the currently logged in user
export const removeAllNotificationsAsync = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/removeUserNotifications/${userId}`);
      return dispatch(removeAllNotifications());
    } catch (err) {
      // error occurred while deleting notification in db
      return dispatch(displayError(err.response.data.message));
    }
  };
};

export const updateNotification = (_id, isRead) => {
  return {
    type: UPDATE_NOTIFICATION,
    _id,
    isRead,
  };
};

export const updateNotificationAsync = (_id, isRead) => {
  return async (dispatch) => {
    try {
      const notificationResp = await axios.patch(
        `${BASE_URL}/markAsRead/${_id}`,
        { isRead }
      );
      return dispatch(
        updateNotification(
          notificationResp.data._id,
          notificationResp.data.isRead
        )
      );
    } catch (err) {
      // error occurred while deleting notification in db
      return dispatch(displayError(err.response.data.message));
    }
  };
};

export const updateAllNotifications = (isRead) => {
  return {
    type: UPDATE_ALL_NOTIFICATIONS,
    isRead,
  };
};

// update all notifications refers to all notifications belonging to the currently logged in user
export const updateAllNotificationsAsync = (userId, isRead) => {
  return async (dispatch) => {
    try {
      await axios.patch(`${BASE_URL}/markAllAsRead/${userId}`, { isRead });
      return dispatch(updateAllNotifications(isRead));
    } catch (err) {
      // error occurred while deleting notification in db
      return dispatch(displayError(err.response.data.message));
    }
  };
};
