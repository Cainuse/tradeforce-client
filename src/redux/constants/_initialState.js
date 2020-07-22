export const initialState = {
  loading: false,
  flyoutIsOpen: false,
  modal: {
    isOpen: false,
    type: "",
    openedFrom: "",
  },
  snackbar: {
    isOpen: false,
    type: "",
    message: "",
  },
  postings: [],
  currentUser: {
    isFetching: false,
    isFailed: false,
    user: null,
  },
  error: null,
  itemDetail: {},
  userDetail: {},
  notifications: [],
};
