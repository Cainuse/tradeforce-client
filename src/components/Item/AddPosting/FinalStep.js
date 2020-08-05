import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";

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
  const { closeModal, id, loadItemDetail } = props;
  const classes = useStyles();
  const history = useHistory();

  const close = async (e) => {
    e.preventDefault();
    let result = await loadItemDetail(id);
    if (result.type === "success") {
      history.push(`/items/item=${id}`);
    }
    closeModal();
  };

  return (
    <div>
      <div className={classes.form}>
        <Typography>You have successfully created a new posting.</Typography>
        <Link href="#" onClick={close} className={classes.link}>
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
