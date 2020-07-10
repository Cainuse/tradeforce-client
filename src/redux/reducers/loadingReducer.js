import { initialState } from "../constants/_initialState";
import { SET_LOADING } from "../constants/actionTypes";

export const loadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.isLoading;
    default:
      return state;
  }
};
