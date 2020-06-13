import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const modalStyles = makeStyles(() => ({
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

/**
 * MAIN: Modal Component
 *
 * Note: Depending on Modal Type, will display different contents
 **/
class Modal extends React.Component {
  render() {
    let classes = modalStyles();

    return (
      <Modal
        className={classes.modalContainer}
        open={this.props.modal.isOpen}
      ></Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(Modal);
