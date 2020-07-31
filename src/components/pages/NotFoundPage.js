import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
  mainText: {
    fontWeight: 400,
    fontSize: "25vh",
    color: theme.palette.primary.main,
  },
  subText: {
    fontWeight: 300,
    margin: theme.spacing(1, 0, 7, 0),
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const redirectToHomepage = () => {
    history.push("/");
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h1" className={classes.mainText}>
        404
      </Typography>
      <Typography variant="h4" className={classes.subText}>
        {"Oops, sorry we can't find that page!"}
      </Typography>
      <Button onClick={redirectToHomepage} variant="outlined" color="primary">
        Return to Homepage
      </Button>
    </Container>
  );
};

export default NotFoundPage;
