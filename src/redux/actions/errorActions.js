export const setError = (type, errMsg) => {
  return {
    type: type,
    message: errMsg,
  };
};
