import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Step1 from "../AddPosting/Step1";
import Step3 from "../AddPosting/Step3";
import _ from "lodash";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  updateItemDetail,
  deletePosting,
} from "../../redux/actions/postingActions";
import ConfirmationDialog from "../ConfirmationDialog";
import ImageUpload from "../ImageUpload";

const useStyles = (theme) => ({
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
  },
  section: {
    margin: theme.spacing(2, 0),
  },
  cancelButton: {
    color: "#AD343E",
    borderColor: "#AD343E",
  },
});

class EditItemDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    const { itemDetail } = props;

    this.state = {
      ...itemDetail,
      errors: {
        title: "",
        description: "",
        category: "",
        condition: "",
        quantity: "",
      },
      changedFields: [],
      confirmationOpen: false,
      confirmationType: "",
    };
  }

  redirect = () => {
    const { history } = this.props;
    history.goBack();
  };

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

    return this.isFormInvalid();
  };

  updateChangedFields = (field) => {
    if (!_.includes(this.state.changedFields, field)) {
      this.setState({ changedFields: [...this.state.changedFields, field] });
    }
  };

  handleInputChange = (e) => {
    let { name, value } = e.target;
    this.validateInput([name, value]);
    this.setState({ [name]: value });
    this.updateChangedFields(name);
  };

  handleAddtoList = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        [e.target.name]: [...this.state[e.target.name], e.target.value],
      });
      this.updateChangedFields(e.target.name);
      e.target.value = "";
    }
  };

  handleRemoveFromList = (type, idx) => {
    let newTags = this.state[type].filter((item, index) => index !== idx);
    this.setState({ [type]: newTags });
    this.updateChangedFields(type);
  };

  handleAddImage = (list) => {
    this.setState({
      images: [...this.state.images, ...list],
    });
    this.updateChangedFields("images");
  };

  handleConfirmationOpen = (type) => {
    this.setState({ confirmationOpen: true, confirmationType: type });
  };

  handleSubmit = async () => {
    if (!this.validateRequiredFields()) {
      let details = _.pick(this.state, this.state.changedFields);
      await this.props.updateItemDetail(this.state._id, details);
      this.redirect();
    } else {
      this.handleConfirmationOpen("alert");
    }
  };

  handleDeletePosting = async () => {
    let { history, deletePosting } = this.props;
    await deletePosting(this.state._id);
    history.go(-2);
  };

  handleConfirmationClose = () => {
    this.setState({ confirmationOpen: false });
  };

  selectConfirmationToDisplay = () => {
    switch (this.state.confirmationType) {
      case "delete":
        return (
          <ConfirmationDialog
            open={this.state.confirmationOpen}
            submitAction={this.handleDeletePosting}
            submitName={"Delete"}
            dialogMessage={"This action cannot be undone"}
            dialogTitle={"Are you sure you want to delete this posting?"}
            handleClose={this.handleConfirmationClose}
          />
        );
      case "alert":
        return (
          <ConfirmationDialog
            open={this.state.confirmationOpen}
            submitAction={this.handleConfirmationClose}
            submitName={"OK"}
            dialogMessage={"Please fill required the fields"}
            dialogTitle={"Information is missing from the form"}
            handleClose={this.handleConfirmationClose}
            omitCancelButton={true}
          />
        );
      default:
        return (
          <ConfirmationDialog
            open={this.state.confirmationOpen}
            submitAction={this.redirect}
            submitName={"OK"}
            dialogMessage={"Any changes will not be saved"}
            dialogTitle={"Are you sure you want to leave this page?"}
            handleClose={this.handleConfirmationClose}
          />
        );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.confirmationOpen && this.selectConfirmationToDisplay()}
        <div className={classes.buttonHeader}>
          <Button onClick={() => this.handleConfirmationOpen("redirect")}>
            &lt; Back to Posting
          </Button>
          <Button
            onClick={() => this.handleConfirmationOpen("delete")}
            startIcon={<DeleteIcon />}
            className={classes.cancelButton}
          >
            Delete Posting
          </Button>
        </div>
        <Container>
          <div className={classes.section}>
            <Step1
              change={this.handleInputChange}
              addTag={this.handleAddtoList}
              state={this.state}
              deleteTag={this.handleRemoveFromList}
            />
          </div>
          <div className={classes.section}>
            <ImageUpload
              addImage={this.handleAddImage}
              images={this.state.images}
              deleteImage={this.handleRemoveFromList}
            />
          </div>
          <div className={classes.section}>
            <Step3
              addRequest={this.handleAddtoList}
              deleteRequest={this.handleRemoveFromList}
              requests={this.state.requestedItems}
            />
          </div>
          <div className={classes.buttonHeader}>
            <Button
              onClick={() => this.handleConfirmationOpen("redirect")}
              variant="outlined"
              className={classes.cancelButton}
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemDetail: state.itemDetail,
  };
};

export default connect(mapStateToProps, { updateItemDetail, deletePosting })(
  withRouter(withStyles(useStyles)(EditItemDetailsPage))
);
