import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import ProfileCard from "../User/ProfileCard";
import { makeStyles } from "@material-ui/core";
import hero from "../../images/hero.png";
import UserDetails from "../User/UserDetails";
import { loadUserDetails } from "../../redux/actions/userDetailActions";
import { openReviewModal } from "../../redux/actions/modalActions";

const useStyles = makeStyles(() => ({
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
}));

const UserProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const userDetail = useSelector((state) => state.userDetail);
  const currentUser = useSelector((state) => state.currentUser.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    async function loadUser() {
      try {
        const userId = location.pathname.split("=")[1];
        let response = await dispatch(
          loadUserDetails({
            userId,
            currentUserId: currentUser ? currentUser._id : null,
          })
        );
        if (response !== "success") {
          history.push("/UserNotFound");
        }
      } catch (error) {
        console.log("Failed to load User Profile page");
      }
    }
    loadUser();
  }, [dispatch, history, location, currentUser]);

  return Object.keys(userDetail).length !== 0 ? (
    <div>
      <div className={classes.hero}></div>
      <div className={classes.container}>
        <ProfileCard userDetail={userDetail} currentUser={currentUser} />
        <UserDetails
          userDetail={userDetail}
          currentUser={currentUser}
          openReviewModal={() => dispatch(openReviewModal())}
        />
      </div>
    </div>
  ) : null;
};

export default UserProfile;
