import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import ReviewSection from "./ReviewSection";
import ItemDetailContainer from "./ItemDetailContainer";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

// Item Details page for in-depth view of offered items

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Montserrat",
  },
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function ItemPage(props) {
  let { itemDetail, currentUser } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const pathItems = location.pathname.split("/");
  // const parentPath = location.pathname.substring(
  //   0,
  //   location.pathname.lastIndexOf("/")
  // );
  const parentPath = "/" + pathItems[1];

  const redirect = () => {
    history.push(parentPath + "/" + location.search);
  };

  const editPosting = () => {
    history.push(parentPath + "/" + pathItems[2] + "/edit");
  };

  return (
    <div>
      <div className={classes.buttonHeader}>
        <Button onClick={redirect}>&lt; Back to Search</Button>
        {currentUser.id === itemDetail.ownerId && (
          <Button
            onClick={editPosting}
            startIcon={<EditIcon />}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
        )}
      </div>
      <Container className={classes.root}>
        <ItemDetailContainer itemDetail={itemDetail} />
        <Divider className={classes.divider} />
        <ReviewSection itemDetail={itemDetail} />
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    itemDetail: state.itemDetail,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(ItemPage);
