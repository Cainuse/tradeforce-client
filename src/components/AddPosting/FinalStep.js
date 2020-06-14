import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { closeModal } from "../../redux/actions/modalActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  link: {
    textDecoration: "none",
  },
}));

const FinalStep = (props) => {
  const { closeModal } = props;

  const classes = useStyles();

  return (
    <div>
      <div className={classes.form}>
        <Typography>You have successfully created a new posting.</Typography>
        <Link
          to="/items/item=3"
          onClick={() => closeModal()}
          className={classes.link}
        >
          <Typography variant="h4" color="primary">
            tradeforce.com/82W7&DI1
          </Typography>
        </Link>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            closeModal();
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default connect(null, { closeModal })(FinalStep);
