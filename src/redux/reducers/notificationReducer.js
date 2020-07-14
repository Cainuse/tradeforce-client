import { initialState } from "../constants/_initialState";
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  REMOVE_ALL_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  UPDATE_ALL_NOTIFICATIONS,
  GET_NOTIFICATIONS,
} from "../constants/actionTypes";

export const notificationsReducer = (
  state = initialState.notifications,
  action
) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.notifications;
    case ADD_NOTIFICATION:
      return [
        ...state,
        {
          _id: action._id,
          userId: action.userId,
          type: action.notiType,
          isRead: false,
          date: new Date(),
          content: action.content,
        },
      ];
    case REMOVE_NOTIFICATION:
      return state.filter((notification) => notification._id !== action._id);
    case REMOVE_ALL_NOTIFICATIONS:
      return [];
    case UPDATE_NOTIFICATION:
      return state.map((notification) =>
        notification._id === action._id
          ? {
              ...notification,
              isRead: action.isRead,
            }
          : notification
      );
    case UPDATE_ALL_NOTIFICATIONS:
      return state.map((notification) => ({
        ...notification,
        isRead: action.isRead,
      }));
    default:
      return state;
  }
};
