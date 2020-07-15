import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
  const { closeModal, id } = props;

  const classes = useStyles();

  return (
    <div>
      <div className={classes.form}>
        <Typography>You have successfully created a new posting.</Typography>
        <Link
          to={`/items/item=${id}`}
          onClick={() => closeModal()}
          className={classes.link}
        >
          <Typography variant="h4" color="primary">
            {`tradeforce.com/${id}`}
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

export default FinalStep;
