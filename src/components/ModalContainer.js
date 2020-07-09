import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import { closeModal } from "../redux/actions/modalActions";
import {
  OFFER_MODAL,
  POSTING_MODAL,
  LOGIN_MODAL,
} from "../redux/constants/modalTypes";
import AddPosting from "../components/AddPosting/AddPosting";
import AddOffering from "./AddOffering/AddOffering";
import LoginModal from "./Login/Login";

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
    width: "50%",
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
    case POSTING_MODAL:
      return <AddPosting />;
    case LOGIN_MODAL:
      return <LoginModal />;
    default:
      return <ErrorModal />;
  }
};

const MakeModalContainer = (props) => {
  let classes = modalStyles();

  return (
    <Modal
      className={classes.modalContainer}
      open={props.modal.isOpen}
      onClose={() => {
        props.closeModal();
      }}
      disableScrollLock={true}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.modalContents}>{chooseModalContents(props)}</div>
    </Modal>
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
