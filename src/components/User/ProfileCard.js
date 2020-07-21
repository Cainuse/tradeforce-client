import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "./UserAvatar";
import defaultProfile from "../../images/placeholder-profile.png";
import { displayError } from "../../redux/actions/snackbarActions";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Rating from "@material-ui/lab/Rating";
import _ from "lodash";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  profile: {
    fontFamily: "Montserrat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(5),
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: 400,
  },
  username: {
    fontSize: ".9rem",
    fontWeight: 300,
  },
  editButton: {
    color: theme.palette.primary.main,
  },
}));

const ProfileCard = (props) => {
  let { userDetail, currentUser } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const calculateAverageReview = () => {
    if (userDetail.reviews.length > 0) {
      let totalRatingValue = _.reduce(
        userDetail.reviews,
        (acc, review) => acc + review.rating,
        0
      );
      return totalRatingValue / userDetail.reviews.length;
    }
    return 0;
  };

  const averageRating = calculateAverageReview();

  const redirectToEditPage = () => {
    history.push(location.pathname + "/edit");
  };

  return (
    <div className={classes.profile}>
      <UserAvatar
        isLargeAvatar={true}
        userProfileImgSrc={
          userDetail.profilePic ? userDetail.profilePic : defaultProfile
        }
      />
      <Typography
        className={classes.name}
      >{`${userDetail.firstName} ${userDetail.lastName}`}</Typography>
      <Typography className={classes.username}>
        {userDetail.userName}
      </Typography>
      {userDetail._id === currentUser._id ? (
        <Button
          onClick={redirectToEditPage}
          endIcon={<EditIcon />}
          className={classes.editButton}
        >
          Edit
        </Button>
      ) : (
        <Rating
          name="half-rating-read"
          value={averageRating}
          precision={0.5}
          readOnly
        />
      )}
    </div>
  );
};

export default connect(null, { displayError })(ProfileCard);
