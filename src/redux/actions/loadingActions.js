import { SET_LOADING } from "../constants/actionTypes";

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    isLoading,
  };
};
