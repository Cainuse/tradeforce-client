export const initialState = {
  loading: false,
  flyoutIsOpen: false,
  modal: {
    isOpen: false,
    type: "",
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
  userDetail: {
    _id: "5f03d321c8c1090b3a425982",
    firstName: "Eleanor",
    lastName: "Shellstrop",
    userName: "shellstrop",
    postalCode: "V3L0A5",
    location: "New Westminster, BC",
    postings: [],
    reviews: [],
  },
  notifications: [],
};
