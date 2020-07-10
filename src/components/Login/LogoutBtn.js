import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { unsetUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";

const loggedOutStyles = makeStyles(() => ({
  logoutBtn: {
    fontSize: "1.2rem",
    marginTop: "1%",
    fontWeight: "100",
    textTransform: "none",
  },
}));

const LogoutBtn = ({ unsetUser }) => {
  const classes = loggedOutStyles();
  const history = useHistory();
  return (
    <Button
      type="button"
      color="primary"
      variant="contained"
      className={classes.logoutBtn}
      onClick={() => {
        localStorage.removeItem("token");
        unsetUser();
        history.push("/");
      }}
    >
      Logout
    </Button>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  unsetUser: () => dispatch(unsetUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutBtn);
