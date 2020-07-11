import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import RegisterForm from "./RegisterForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LoginModal = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <RegisterForm />
    </div>
  );
};

export default connect()(LoginModal);
