import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { closeModal } from "../redux/actions/modalActions";

import {
  OFFER_MODAL,
  POSTING_MODAL,
  LOGIN_MODAL,
  REVIEW_MODAL,
  OFFER_DETAILS_MODAL, OFFER_SENT_DETAILS_MODAL
} from "../redux/constants/modalTypes";
import AddPosting from "../components/AddPosting/AddPosting";
import AddOffering from "./AddOffering/AddOffering";
import { Dialog } from "@material-ui/core";
import LoginModal from "./Login/Login";
import ReviewModal from "./Review/AddReview";
import { OfferingDetails } from "./Offering/OffersReceived/OfferingDetails";
import { OfferSentDetails } from "./Offering/OffersSent/OfferSentDetails";

//--------------- Helper: Error for if wrong modal type is given -------------//
const errorModalStyle = makeStyles((theme) => ({
  errorModal: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const ErrorModal = () => {
  let classes = errorModalStyle();

  return (
    <div className={classes.errorModal}>
      <p>Error: Wrong modal type</p>
    </div>
  );
};

//------------- Modal Container and Choosing Modal Content -------------------//

const modalStyles = makeStyles(() => ({
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    // width: "40%",
    height: "100%",
    maxHeight: "100vh",
  },
  modalContents: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    outline: "none",
  },
}));

const chooseModalContents = (props) => {
  switch (props.modal.type) {
    case OFFER_MODAL:
      return <AddOffering />;
    case OFFER_DETAILS_MODAL:
      return <OfferingDetails />;
    case OFFER_SENT_DETAILS_MODAL:
      return <OfferSentDetails />;
    case POSTING_MODAL:
      return <AddPosting />;
    case LOGIN_MODAL:
      return <LoginModal />;
    case REVIEW_MODAL:
      return <ReviewModal />;
    case "":
      return null;
    default:
      return <ErrorModal />;
  }
};

const MakeModalContainer = (props) => {
  let classes = modalStyles();

  return (
    <Dialog
      // className={classes.modalContainer}
      open={props.modal.isOpen}
      onClose={() => {
        props.closeModal();
      }}
      scroll={"paper"}
      maxWidth={props.modal.type === LOGIN_MODAL ? "sm" : "md"}
      fullWidth={true}
      disableScrollLock={true}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
    >
      <div className={classes.modalContents}>{chooseModalContents(props)}</div>
    </Dialog>
  );
};

/**
 * MAIN: Modal Component
 *
 * Note: Depending on Modal Type, will display different contents
 **/
class ModalContainer extends React.Component {
  render() {
    return (
      <MakeModalContainer
        modal={this.props.modal}
        closeModal={this.props.closeModal}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
