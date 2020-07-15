import React from "react";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { addPosting } from "../../redux/actions/postingActions";
import { closeModal } from "../../redux/actions/modalActions";
import { displayError } from "../../redux/actions/snackbarActions";
import { ADD_POSTING_ERROR } from "../../redux/constants/snackbarMessageTypes";

import DisplayStepper from "./DisplayStepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import FinalStep from "./FinalStep";

const steps = ["Item Details", "Images", "Requested Items", "Review"];

const useStyles = (theme) => ({
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    position: "relative",
  },
  modalHeader: {
    fontSize: "1.5rem",
    fontWeight: 400,
    marginBottom: theme.spacing(1),
  },
  form: {
    display: "inline-block",
    width: "100%",
    minHeight: "270px",
    marginBottom: theme.spacing(3),
  },
  header: {
    display: "inline-block",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});

class AddPosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      title: "",
      description: "",
      category: "",
      condition: "",
      tags: [],
      images: [],
      requestedItems: [],
      quantity: 1,
      errors: {
        title: "",
        description: "",
        category: "",
        condition: "",
        quantity: "",
      },
      _id: "",
    };
  }

  isFormInvalid = () => {
    let requiredFields = _.pick(this.state, [
      "title",
      "description",
      "category",
      "condition",
    ]);
    let haveEmptyFields = _.values(requiredFields).some(
      (val) => val.length === 0
    );
    let isQuantityInvalid = this.state.quantity < 1;
    return isQuantityInvalid || haveEmptyFields;
  };

  resetPostingFields = () => {
    this.setState({
      title: "",
      description: "",
      category: "",
      condition: "",
      tags: [],
      images: [],
      requestedItems: [],
      quantity: 1,
    });
  };

  validateInput = ([key, value]) => {
    let errors = this.state.errors;
    switch (key) {
      case "title":
        errors.title = value.length > 0 ? "" : "Title cannot be left blank";
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
        errors.quantity = value > 0 ? "" : "Quantity must be greater than 0";
        break;
      default:
        break;
    }
    this.setState({ errors: errors });
  };

  validateRequiredFields = () => {
    let requiredFields = _.toPairs(
      _.pick(this.state, [
        "title",
        "description",
        "category",
        "condition",
        "quantity",
      ])
    );

    _.forEach(requiredFields, this.validateInput);

    return this.isFormInvalid()
      ? this.state.activeStep
      : this.state.activeStep + 1;
  };

  handleInputChange = (e) => {
    let { name, value } = e.target;
    this.validateInput([name, value]);
    this.setState({ [name]: value });
  };

  handleAddtoList = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        [e.target.name]: [...this.state[e.target.name], e.target.value],
      });
      e.target.value = "";
    }
  };

  handleRemoveFromList = (type, idx) => {
    let newTags = this.state[type].filter((item, index) => index !== idx);
    this.setState({ [type]: newTags });
  };

  handleAddImage = (list) => {
    this.setState({
      images: [...this.state.images, ...list],
    });
  };

  setActiveStep = (step) => {
    this.setState({ activeStep: step });
  };

  handleSubmit = async () => {
    let submitted = _.pick(this.state, [
      "title",
      "description",
      "category",
      "condition",
      "tags",
      "images",
      "requestedItems",
      "quantity",
    ]);
    this.resetPostingFields();
    try {
      let id = await this.props.addPosting(submitted, this.props.currentUser);
      this.setState({ activeStep: this.state.activeStep + 1, _id: id });
    } catch (e) {
      this.props.closeModal();
      this.props.displayError(ADD_POSTING_ERROR);
    }
  };

  handleNext = () => {
    if (this.state.activeStep === 0) {
      let nextStep = this.validateRequiredFields();
      this.setState({ activeStep: nextStep });
    } else if (this.state.activeStep === 3) {
      this.handleSubmit();
    } else {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setActiveStep(0);
  };

  returnToActiveStep = (stepLabel) => {
    let step = this.state.activeStep;
    switch (stepLabel) {
      case "Item Details":
        step = 0;
        break;
      case "Images":
        step = 1;
        break;
      case "Requested Items":
        step = 2;
        break;
      default:
        break;
    }
    this.setState({ activeStep: step });
  };

  getActiveStepDisplay = () => {
    switch (this.state.activeStep) {
      case 0:
        return (
          <Step1
            change={this.handleInputChange}
            addTag={this.handleAddtoList}
            state={this.state}
            deleteTag={this.handleRemoveFromList}
          />
        );
      case 1:
        return (
          <Step2
            change={this.handleInputChange}
            addImage={this.handleAddImage}
            images={this.state.images}
            deleteImage={this.handleRemoveFromList}
          />
        );
      case 2:
        return (
          <Step3
            addRequest={this.handleAddtoList}
            deleteRequest={this.handleRemoveFromList}
            requests={this.state.requestedItems}
          />
        );
      case 3:
        return (
          <Step4
            state={this.state}
            returnToActiveStep={this.returnToActiveStep}
          />
        );
      case 4:
        return (
          <FinalStep closeModal={this.props.closeModal} id={this.state._id} />
        );
      default:
        return null;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography align="center" variant="h4">
          Create A Posting
        </Typography>
        <DisplayStepper activeStep={this.state.activeStep} />
        <div className={classes.form}>{this.getActiveStepDisplay()}</div>
        {this.state.activeStep <= 3 && (
          <div className={classes.buttonContainer}>
            <Button
              disabled={this.state.activeStep === 0}
              onClick={this.handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
            >
              {this.state.activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser.user };
};

export default connect(mapStateToProps, {
  addPosting,
  closeModal,
  displayError,
})(withStyles(useStyles)(AddPosting));
