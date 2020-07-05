import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Paper, Button, Grid } from "@material-ui/core";

import { TabPanel } from "./TabPanels";
import OfferContents from "./OfferingContents";
import { makeOffer } from "../../redux/actions/offeringActions";
import { offeringStatus } from "../constants/OfferingConstants";
import { closeModal } from "../../redux/actions/modalActions";
import { displayError, displaySuccess } from "../../redux/actions/snackbarActions";


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
  }
});

const makeOfferer = (currentUser) => {
  return {
    id: currentUser.id,
    userName: currentUser.userName,
    email: currentUser.email,
  }
}

const makeOffering = (comment, offeredItems, currentUser) => {
  let offering = {
    offerer: makeOfferer(currentUser),
    offeredItems: offeredItems,
    comment: comment,
    status: offeringStatus.PENDING,
  }
  return offering;
}

/**
 * MAIN: AddOffering Component
 **/

class AddOffering extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currTabIdx: 0,
      addedItems: [],
      // addedItems: [{
      //   nameOfItem: "name",
      //   quantity: 1,
      //   images: [],
      //   description: "description is great isn't it? So enlightening",
      //   category: "for parts",
      //   condition: "brand new",
      // }],
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

  handleChangeTab = (event, newValue) => {
    this.setState({ currTabIdx: newValue });
  };

  handleChangeAddItemInputs = (event) => {
    let {name, value} = event.target;
    this.validateItemInput([name, value]);

    let item = {...this.state.item};
    item[name] = value;
    this.setState({ item })
  };

  handleChangeCommentInput = (event) => {
      this.validateItemInput([event.target.name, event.target.value]);

      this.setState({
      [event.target.name]: event.target.value,
    });
  };

  clearAddItemForm = () => {
    let clearedItem = {
      nameOfItem: "",
      quantity: 1,
      images: [],
      description: "",
      category: "",
      condition: "",
    }
    this.setState({ item: clearedItem });
  };

  addItemToList = () => {
    let newArr = this.state.addedItems;
    newArr.push(this.state.item);
    this.setState({ addedItems: newArr });
    this.clearAddItemForm();
  };

  deleteItemFromList = (indexToDelete) => {
    let updatedArr = this.state.addedItems.filter((val, index) => index !== indexToDelete);
    this.setState({
      addedItems: updatedArr,
    })
  }

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
  }

  validateItemInput = ([key, value]) => {
    let errors = this.state.errors;
    switch (key) {
      case "nameOfItem":
        errors.nameOfItem = value.length > 0 ? "" : "Name of item cannot be left blank";
        break;
      case "description":
        errors.description = value.length > 0 ? "" : "Description cannot be left blank";
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
        errors.comment = value.length > 0 ? "" : "Must have either a comment or an item";
        break;
      default:
        break;
    }
    this.setState({errors: errors});
  }

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
  }

  //TODO: To use in submit function
  validateOfferSubmission = () => {
    let isValid = true;
    let errors = this.state.errors;

    if (this.state.comment.length === 0 && this.state.addedItems.length === 0) {
      errors.comment = "Must have either a comment or an item";
      errors.addedItems = "Must have either a comment or an item";
      isValid = false;
    }
    this.setState({errors: errors});
    return isValid;

  }

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
    })
  }

  handleSubmit = () => {
    if (this.validateOfferSubmission()){
      let offering = makeOffering(
        this.state.comment,
        this.state.addedItems,
        this.props.currentUser);

      let id = this.props.itemDetail.id;
      this.props.makeOffer(offering , id);
      this.props.displaySuccess("Offer successfully made");
      this.resetFormState();
      setTimeout(() => {this.props.closeModal();}, 700);
    } else {
      this.props.displayError("An offer must have either must have either a comment or an item")
      // window.alert("An offer must have either must have either a comment or an item");
    }
  }


  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Typography align="center" variant="h4" className={classes.modalHeader}>
          Make an Offer
        </Typography>

        <Tabs
          className={classes.tabsRoot}
          value={this.state.currTabIdx}
          indicatorColor={"primary"}
          textColor={"primary"}
          onChange={this.handleChangeTab}
        >
          <Tab label="Create Offering" />
          <Tab label="Preview" />
        </Tabs>

        <TabPanel value={this.state.currTabIdx} index={0}>
          <OfferContents
            state={this.state}
            handleChangeCommentInput={this.handleChangeCommentInput}
            handleChangeAddItemInputs={this.handleChangeAddItemInputs}
            validateItemFields={this.validateRequiredItemFields}
            addItemToList={this.addItemToList}
            deleteItemFromList={this.deleteItemFromList}
          />
        </TabPanel>
        <TabPanel value={this.state.currTabIdx} index={1}>
          Item Two
        </TabPanel>

        <Grid container justify={"space-between"}>
          <Grid item xs={6}>
            <Button>
                Cancel
            </Button>
          </Grid>

          <Grid container item xs={6} justify={"flex-end"}>
            <Button onClick={() => {this.handleSubmit()}}>
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
  displaySuccess: (successMessage) => dispatch(displaySuccess(successMessage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AddOffering));
