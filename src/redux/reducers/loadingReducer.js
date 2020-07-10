import { initialState } from "../constants/_initialState";
import { SET_LOADING } from "../constants/actionTypes";

export const loadingReducer = (state = initialState.loading, action) => {
  return action.type === SET_LOADING ? true : false;
};
