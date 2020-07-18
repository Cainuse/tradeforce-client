import React from "react";
import ProfileCard from "../User/ProfileCard";
import { withStyles } from "@material-ui/core";
import hero from "../../images/hero.png";
import UserDetails from "../User/UserDetails";
import { connect } from "react-redux";
import { displayError } from "../../redux/actions/snackbarActions";
import { withRouter } from "react-router";
import { loadUserDetails } from "../../redux/actions/userDetailActions";
import { openReviewModal } from "../../redux/actions/modalActions";

const useStyles = () => ({
  hero: {
    position: "relative",
    height: "20vh",
    backgroundImage: "url(" + hero + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    zIndex: "-2",
    opacity: "0.7",
  },
  container: {
    width: "100%",
    zIndex: "-1",
    marginTop: "-85px",
  },
  profile: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    position: "absolute",
    top: 0,
  },
  box: {},
});

class UserProfile extends React.Component {
  async componentDidMount() {
    const { location, currentUser, loadUserDetails, history } = this.props;
    const userId = location.pathname.split("=")[1];
    let response = await loadUserDetails({
      userId,
      currentUserId: currentUser ? currentUser._id : null,
    });
    if (response !== "success") {
      history.push("/UserNotFound");
    }
  }

  render() {
    let { userDetail, currentUser, classes, openReviewModal } = this.props;

    return Object.keys(userDetail).length !== 0 ? (
      <div>
        <div className={classes.hero}></div>
        <div className={classes.container}>
          <ProfileCard userDetail={userDetail} currentUser={currentUser} />
          <UserDetails
            userDetail={userDetail}
            currentUser={currentUser}
            openReviewModal={openReviewModal}
          />
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  userDetail: state.userDetail,
  currentUser: state.currentUser.user,
});

const mapDispatchToProps = (dispatch) => ({
  displayError: (msg) => dispatch(displayError(msg)),
  loadUserDetails: ({ userId, currentUserId }) =>
    dispatch(loadUserDetails({ userId, currentUserId })),
  openReviewModal: () => dispatch(openReviewModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(UserProfile)));
