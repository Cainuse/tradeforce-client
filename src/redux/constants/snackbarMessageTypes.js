/* ===== Chat Errors ===== */
export const GET_CHAT_MESSAGES_ERROR =
  "Unable to retrieve conversation messages. Please try again later";
export const MARK_ONE_READ_ERROR =
  "Unable to mark message as read. Please try again later";
export const GET_UNREAD_ERROR =
  "Unable to get unread message count. Please try again later";
export const SEND_MESSAGE_ERROR =
  "Unable to send message. Please try again later";
export const LOAD_CHATLIST_ERROR =
  "Unable to load chat list. Please try again later";

/* ===== Generic Errors ===== */
export const GENERIC_LOADING_ERROR =
  "Some information could not be loaded. Please try again later";
export const GENERIC_ERROR = "Something went wrong. Please try again later";

/* ===== Image Errors ===== */
export const IMAGE_SIZE_ERROR =
  "Selected image file exceeds the 1MB size limit. Please choose a smaller image";
export const IMAGE_TYPE_ERROR =
  "Selected image type is not accepted. Please choose a JPG or PNG file";
export const TOO_MANY_IMAGES_ERROR = "Limit of 5 images has been reached";

/* ===== Message Successes ===== */
export const MESSAGE_SENT_SUCCESS =
  "Message successfully sent! You may go to the Chat page to continue the conversation";

/* ===== Message Errors ===== */
export const MESSAGE_EMPTY_ERROR = "Cannot send an empty message. Try again!";

/* ===== Offering Successes ===== */
export const ADD_OFFER_SUCCESS = "Offer was successfully made";
export const ACCEPT_OFFER_SUCCESS = "You accepted this offer successfully";
export const DECLINE_OFFER_SUCCESS = "You declined this offer successfully";
export const RESCIND_OFFER_SUCCESS = "You rescinded your offer successfully";

/* ===== Offering Errors ===== */
export const ADD_OFFER_ERROR =
  "Offer could not be made. Please try again later";
export const ADD_OFFER_MISSING_INFO_ERROR =
  "An offer must have either a comment or an item";
export const ACCEPT_OFFER_ERROR =
  "Offer could not be accepted. Please try again later";
export const DECLINE_OFFER_ERROR =
  "Offer could not be declined. Please try again later";
export const RESCIND_OFFER_ERROR =
  "Offer could not be rescinded. Please try again later";
export const MAKE_OFFER_AS_UNSIGNED_IN_USER_ERROR =
  "Please sign in or register before making an offer";

/* ===== Posting Errors ===== */
export const ADD_POSTING_ERROR =
  "Something went wrong. Posting was not created";
export const LOAD_POSTING_ERROR =
  "Postings could not be loaded. Please try again later";
export const LOAD_ITEM_NOT_FOUND_ERROR =
  "Something went wrong. Item could not be found";
export const LOAD_ITEM_ERROR =
  "Item could not be loaded. Please try again later";
export const DELETE_POSTING_ERROR =
  "Something went wrong. Posting was not deleted";
export const UPDATE_POSTING_ERROR =
  "Something went wrong. Posting was not updated";
export const LOAD_EDIT_ITEM_DETAIL_PAGE_ERROR =
  "Something went wrong. Edit item page could not be loaded. Please try again later";

/* ===== Posting Successes ===== */
export const DELETE_POSTING_SUCCESS = "Posting was successfully deleted";
export const UPDATE_POSTING_SUCCESS = "Posting was successfully updated";

/* ===== Review Success/Error ===== */
export const ADD_REVIEW_SUCCESS = "Review was successfully added";
export const ADD_REVIEW_ERROR =
  "Review could not be saved. Please try again later";

/* ===== User Login/Registration Successes ===== */
export const USER_REGISTRATION_SUCCESS =
  "Your user was successfully registered!";
export const GOOGLE_LOGIN_SUCCESS = "Successfully logged in through Google!";
export const USER_LOGIN_SUCCESS = "Successfully logged into the app!";
export const USER_LOGOUT_SUCCESS = "Successfully logged out!";

/* ===== User Details Successes ===== */
export const UPDATE_USER_SUCCESS = "Your details were successfully updated";

/* ===== User Details Errors ===== */
export const LOAD_USER_DETAILS_NOT_FOUND_ERROR = "User could not be found";
export const LOAD_USER_DETAILS_ERROR =
  "This profile could not be loaded. Please try again later";
export const UPDATE_USER_ERROR =
  "Something went wrong. Your profile was not updated";
export const INVALID_POSTAL_CODE_ERROR =
  "Google was unable to find your postal code. Please enter a valid postal code";
