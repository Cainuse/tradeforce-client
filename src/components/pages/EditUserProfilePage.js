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
import _ from "lodash";

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

class EditUserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const { userDetail } = props;
    this.state = {
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      profilePic: userDetail.profilePic,
      location: userDetail.location,
      changedFields: [],
      confirmationOpen: false,
    };
  }

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
    this.setState({ [name]: value });
    this.updateChangedFields(name);
  };

  handleSubmit = async () => {
    let details = _.pick(this.state, this.state.changedFields);
    await this.props.updateUserDetails(this.props.userDetail._id, details);
  };

  render() {
    const { classes } = this.props;
    const { firstName, lastName, profilePic, location } = this.state;
    return (
      <div>
        {this.state.confirmationOpen && (
          <ConfirmationDialog
            open={this.state.confirmationOpen}
            submitAction={this.redirect}
            submitName={"OK"}
            dialogMessage={"Any changes will not be saved"}
            dialogTitle={"Are you sure you want to leave this page?"}
          />
        )}
        <div className={classes.buttonHeader}>
          <Button onClick={() => this.handleConfirmationOpen("redirect")}>
            &lt; Back to Profile
          </Button>
        </div>
        <Container>
          <div>
            <UserAvatar
              isLargeAvatar={true}
              userProfileImgSrc={profilePic ? profilePic : defaultProfile}
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Location"
                fullWidth
                margin="dense"
                variant="outlined"
                name="location"
                onChange={this.handleInputChange}
                defaultValue={location}
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
    userDetail: state.userDetail,
  };
};

export default connect(mapStateToProps, { updateUserDetails })(
  withRouter(withStyles(useStyles)(EditUserProfilePage))
);
