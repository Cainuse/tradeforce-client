import React from "react";
import UserAvatar from "../User/UserAvatar";
import { updateUserDetails } from "../../redux/actions/userDetailActions";
import { connect } from "react-redux";
import defaultProfile from "../../images/placeholder-profile.png";
import ConfirmationDialog from "../ConfirmationDialog";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import _ from "lodash";
import { displayError } from "../../redux/actions/snackbarActions";
import {
  IMAGE_TYPE_ERROR,
  IMAGE_SIZE_ERROR,
} from "../../redux/constants/snackbarMessageTypes";

const useStyles = (theme) => ({
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(3, 1),
  },
  section: {
    margin: theme.spacing(2, 0),
  },
  cancelButton: {
    color: "#AD343E",
    borderColor: "#AD343E",
  },
  profileImage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(3, 0),
  },
  removeImgBtn: {
    margin: theme.spacing(1, 0, 0, 0),
    textTransform: "none",
    fontWeight: 300,
  },
  editProfilePic: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    margin: theme.spacing(-4, 0, 0, 13),
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  input: {
    display: "none",
  },
});

class EditUserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = props;
    this.state = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      profilePic: currentUser.profilePic,
      postalCode: currentUser.postalCode,
      changedFields: [],
      confirmationOpen: false,
      errors: {
        firstName: "",
        lastName: "",
        postalCode: "",
        userName: "",
      },
    };
  }

  isFormInvalid = () => {
    let inputFields = _.pick(this.state, [
      "firstName",
      "lastName",
      "postalCode",
    ]);
    let haveEmptyFields = _.values(inputFields).some((val) => val.length === 0);
    let haveErrors = _.values(this.state.errors).some((val) => val.length > 0);
    return haveEmptyFields || haveErrors;
  };

  validatePostalCode = (postalCode) => {
    const us = new RegExp("^\\d{5}(-{0,1}\\d{4})?$");
    const ca = new RegExp(
      /([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i
    );
    return us.test(postalCode) || ca.test(postalCode.replace(/\W+/g, ""));
  };

  validateInput = ([key, value]) => {
    let errors = this.state.errors;
    switch (key) {
      case "firstName":
        errors.firstName =
          value.length > 0 ? "" : "First name cannot be left blank";
        break;
      case "lastName":
        errors.lastName =
          value.length > 0 ? "" : "Last name cannot be left blank";
        break;
      case "postalCode":
        errors.postalCode =
          value.length > 0
            ? this.validatePostalCode(value)
              ? ""
              : "Invalid postal code"
            : "Postal Code cannot be left blank";
        break;
      default:
        break;
    }
    this.setState({ errors: errors });
  };

  redirect = () => {
    const { history } = this.props;
    history.goBack();
  };

  updateChangedFields = (field) => {
    if (!_.includes(this.state.changedFields, field)) {
      this.setState({ changedFields: [...this.state.changedFields, field] });
    }
  };

  handleConfirmationClose = () => {
    this.setState({ confirmationOpen: false });
  };

  handleConfirmationOpen = (type) => {
    this.setState({ confirmationOpen: true, confirmationType: type });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.validateInput([name, value]);
    this.setState({ [name]: value });
    this.updateChangedFields(name);
  };

  handleSubmit = async () => {
    if (!this.isFormInvalid()) {
      let details = _.pick(this.state, this.state.changedFields);
      let response = await this.props.updateUserDetails(
        this.props.currentUser._id,
        details
      );
      if (response) {
        this.redirect();
      }
    } else {
      window.alert("Please fill required fields");
    }
  };

  handleRemoveProfileImage = () => {
    this.setState({ profilePic: "" });
    this.updateChangedFields("profilePic");
    this.fileInput.value = "";
  };

  handleImageUpload = (e) => {
    let file = e.target.files[0];
    let fileSize = file.size / 1024 / 1024;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      this.fileInput.value = "";
      this.props.displayError(IMAGE_TYPE_ERROR);
    } else if (fileSize > 1) {
      this.fileInput.value = "";
      this.props.displayError(IMAGE_SIZE_ERROR);
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({ profilePic: reader.result });
        this.updateChangedFields("profilePic");
      };
    }
  };

  render() {
    const { classes } = this.props;
    const { firstName, lastName, profilePic, postalCode, errors } = this.state;
    return (
      <div>
        {this.state.confirmationOpen && (
          <ConfirmationDialog
            open={this.state.confirmationOpen}
            submitAction={this.redirect}
            submitName={"OK"}
            dialogMessage={"Any changes will not be saved"}
            dialogTitle={"Are you sure you want to leave this page?"}
            handleClose={this.handleConfirmationClose}
          />
        )}
        <div className={classes.buttonHeader}>
          <Button onClick={() => this.handleConfirmationOpen("redirect")}>
            &lt; Back to Profile
          </Button>
        </div>
        <Container>
          <div className={classes.profileImage}>
            <UserAvatar
              isLargeAvatar={true}
              userProfileImgSrc={profilePic ? profilePic : defaultProfile}
            />
            <IconButton
              className={classes.editProfilePic}
              size="small"
              onClick={() => this.fileInput.click()}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <Button
              className={classes.removeImgBtn}
              onClick={this.handleRemoveProfileImage}
            >
              Remove Image
            </Button>
            <input
              type="file"
              className={classes.input}
              ref={(fileInput) => (this.fileInput = fileInput)}
              onChange={this.handleImageUpload}
              accept="image/png, image/jpeg"
            />
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="First Name"
                fullWidth
                margin="dense"
                variant="outlined"
                name="firstName"
                onChange={this.handleInputChange}
                defaultValue={firstName}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Last Name"
                fullWidth
                margin="dense"
                variant="outlined"
                name="lastName"
                onChange={this.handleInputChange}
                defaultValue={lastName}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Postal Code"
                fullWidth
                margin="dense"
                variant="outlined"
                name="postalCode"
                onChange={this.handleInputChange}
                defaultValue={postalCode}
                error={!!errors.postalCode}
                helperText={errors.postalCode}
              />
            </Grid>
          </Grid>
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
    currentUser: state.currentUser.user,
  };
};

export default connect(mapStateToProps, { updateUserDetails, displayError })(
  withRouter(withStyles(useStyles)(EditUserProfilePage))
);
