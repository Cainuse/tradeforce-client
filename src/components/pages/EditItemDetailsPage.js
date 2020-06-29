import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Step1 from "../AddPosting/Step1";
import Step2 from "../AddPosting/Step2";
import Step3 from "../AddPosting/Step3";
import _ from "lodash";

const useStyles = (theme) => ({
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  section: {
    margin: theme.spacing(2, 0),
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
    };
  }

  redirect = () => {
    const { history, location } = this.props;
    const parentPath = location.pathname.substring(
      0,
      location.pathname.lastIndexOf("/")
    );
    history.push(parentPath);
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

    return this.isFormInvalid();
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

  handleSubmit = () => {
    if (!this.validateRequiredFields()) {
      console.log("validated inputs");
      //call action to update store
      // call to redirect back to posting
    } else {
      console.log("not valid");
      window.alert("Please fill required fields");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.buttonHeader}>
          <Button onClick={this.redirect}>&lt; Back to Posting</Button>
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
            <Step2
              change={this.handleInputChange}
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
            <Button onClick={this.redirect} variant="contained" color="primary">
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

export default connect(mapStateToProps)(
  withRouter(withStyles(useStyles)(EditItemDetailsPage))
);
