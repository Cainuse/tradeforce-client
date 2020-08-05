import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, Button, Grid } from "@material-ui/core";

import OfferContents from "./OfferingContents";
import { makeOffer } from "../../../redux/actions/offeringActions";
import { offeringStatus } from "../../constants/OfferingConstants";
import { closeModal } from "../../../redux/actions/modalActions";
import { displayError } from "../../../redux/actions/snackbarActions";
import { ADD_OFFER_MISSING_INFO_ERROR } from "../../../redux/constants/snackbarMessageTypes";
import ChatSocketServer from "../../../utils/ChatSocketServer";

const useStyles = (theme) => ({
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    position: "relative",
  },
  tabsRoot: {
    marginBottom: "30px",
    outline: "display",
  },
  modalHeader: {
    paddingBottom: "20px",
  },
  submitBtn: {
    backgroundColor: "#6ab547",
  },
});

//-------------- Helper functions -----------------------//

const makeOffering = (comment, offeredItems, currentUser, postingId) => {
  let { user } = currentUser;
  let offering = {
    postingId: postingId,
    userId: user._id,
    offeredItems: offeredItems,
    comment: comment,
    status: offeringStatus.PENDING,
    date: new Date(),
  };
  return offering;
};

/**
 * MAIN: AddOffering Component
 **/

class AddOffering extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currTabIdx: 0,
      addedItems: [],
      showAddForm: true,
      comment: "",
      item: {
        nameOfItem: "",
        quantity: 1,
        images: [],
        description: "",
        category: "",
        condition: "",
      },
      errors: {
        addedItems: "",
        comment: "",
        nameOfItem: "",
        description: "",
        category: "",
        condition: "",
        quantity: "",
      },
    };
  }

  addItemToList = () => {
    let newArr = this.state.addedItems;
    newArr.push(this.state.item);
    this.setState({ addedItems: newArr });
    this.clearAddItemForm();
  };

  clearAddItemForm = () => {
    let clearedItem = {
      nameOfItem: "",
      quantity: 1,
      images: [],
      description: "",
      category: "",
      condition: "",
    };
    this.setState({ item: clearedItem });
  };

  deleteItemFromList = (indexToDelete) => {
    let updatedArr = this.state.addedItems.filter(
      (val, index) => index !== indexToDelete
    );
    this.setState({
      addedItems: updatedArr,
    });
  };

  handleAddImage = (list) => {
    this.setState({
      item: {
        ...this.state.item,
        images: [...this.state.item.images, ...list],
      },
    });
  };

  handleCancel = () => {
    let { comment, addedItems } = this.state;
    if (comment !== "" || addedItems.length !== 0) {
      let result = window.confirm(
        "Are you sure you want to leave? Changes will not be saved."
      );
      if (result) {
        this.props.closeModal();
      }
    } else {
      this.props.closeModal();
    }
  };

  handleChangeAddItemInputs = (event) => {
    let { name, value } = event.target;
    this.validateItemInput([name, value]);

    let item = this.state.item;
    item[name] = value;
    this.setState({ item });
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ currTabIdx: newValue });
  };

  handleChangeCommentInput = (event) => {
    this.validateItemInput([event.target.name, event.target.value]);

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRemoveFromList = (type, idx) => {
    let newImages = this.state.item[type].filter(
      (item, index) => index !== idx
    );
    this.setState({
      item: {
        ...this.state.item,
        [type]: newImages,
      },
    });
  };

  handleSubmit = () => {
    if (this.validateOfferSubmission()) {
      let offering = makeOffering(
        this.state.comment,
        this.state.addedItems,
        this.props.currentUser,
        this.props.itemDetail._id
      );

      let id = this.props.itemDetail._id;
      let response = this.props.makeOffer(offering, id);
      if (response) {
        ChatSocketServer.sendNotification(this.props.itemDetail.ownerId);
      }
      this.resetFormState();
      setTimeout(() => {
        this.props.closeModal();
      }, 700);
    } else {
      this.props.displayError(ADD_OFFER_MISSING_INFO_ERROR);
    }
  };

  isItemFormInvalid = () => {
    let requiredAddItemFields = _.pick(this.state.item, [
      "nameOfItem",
      "description",
      "category",
      "condition",
    ]);

    let hasAddItemFormEmptyFields = _.values(requiredAddItemFields).some(
      (val) => val.length === 0
    );
    let isQuantityInvalid = this.state.quantity < 1;

    return isQuantityInvalid || hasAddItemFormEmptyFields;
  };

  resetFormState = () => {
    this.setState({
      addedItems: [],
      showAddForm: true,
      comment: "",
      item: {
        nameOfItem: "",
        quantity: 1,
        images: [],
        description: "",
        category: "",
        condition: "",
      },
      errors: {
        addedItems: "",
        comment: "",
        nameOfItem: "",
        description: "",
        category: "",
        condition: "",
        quantity: "",
      },
    });
  };

  validateItemInput = ([key, value]) => {
    let errors = this.state.errors;
    switch (key) {
      case "nameOfItem":
        errors.nameOfItem =
          value.length > 0 ? "" : "Name of item cannot be left blank";
        break;
      case "description":
        errors.description =
          value.length > 0 ? "" : "Description cannot be left blank";
        break;
      case "category":
        errors.category = value.length > 0 ? "" : "Category must be selected";
        break;
      case "condition":
        errors.condition = value.length > 0 ? "" : "Condition must be selected";
        break;
      case "quantity":
        errors.quantity = value > 0 ? "" : "Quantity must be greater than 1";
        break;
      case "comment":
        errors.comment =
          value.length > 0 ? "" : "Must have either a comment or an item";
        break;
      default:
        break;
    }
    this.setState({ errors: errors });
  };

  validateOfferSubmission = () => {
    let isValid = true;
    let errors = this.state.errors;

    if (this.state.comment.length === 0 && this.state.addedItems.length === 0) {
      errors.comment = "Must have either a comment or an item";
      errors.addedItems = "Must have either a comment or an item";
      isValid = false;
    }
    this.setState({ errors: errors });
    return isValid;
  };

  validateRequiredItemFields = () => {
    let requiredFields = _.toPairs(
      _.pick(this.state.item, [
        "nameOfItem",
        "description",
        "category",
        "condition",
        "quantity",
      ])
    );

    _.forEach(requiredFields, this.validateItemInput);

    return !this.isItemFormInvalid();
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Typography align="center" variant="h4" className={classes.modalHeader}>
          Make an Offer
        </Typography>

        <OfferContents
          state={this.state}
          handleChangeCommentInput={this.handleChangeCommentInput}
          handleChangeAddItemInputs={this.handleChangeAddItemInputs}
          addImage={this.handleAddImage}
          deleteImage={this.handleRemoveFromList}
          validateItemFields={this.validateRequiredItemFields}
          addItemToList={this.addItemToList}
          deleteItemFromList={this.deleteItemFromList}
        />

        <Grid container justify={"space-between"}>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                this.handleCancel();
              }}
            >
              Cancel
            </Button>
          </Grid>

          <Grid container item xs={6} justify={"flex-end"}>
            <Button
              onClick={() => {
                this.handleSubmit();
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  itemDetail: state.itemDetail,
});

const mapDispatchToProps = (dispatch) => ({
  makeOffer: (offering, postingId) => dispatch(makeOffer(offering, postingId)),
  closeModal: () => dispatch(closeModal()),
  displayError: (errMessage) => dispatch(displayError(errMessage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AddOffering));
