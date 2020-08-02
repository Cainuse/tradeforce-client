export const initialState = {
  loading: false,
  flyoutIsOpen: false,
  modal: {
    isOpen: false,
    type: "",
    openedFrom: "",
    contentInfo: {},
  },
  snackbar: {
    isOpen: false,
    type: "",
    message: "",
  },
  postings: {
    numPages: 0,
    numResults: 0,
    postingPreviews: [],
  },
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
