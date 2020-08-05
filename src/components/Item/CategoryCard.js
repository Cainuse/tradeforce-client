import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { clearOldPostings } from "../../redux/actions/postingActions";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    width: "10vw",
    height: "10vw",
    alignItems: "center",
    flexDirection: "column",
    margin: theme.spacing(1),
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "100%",
  },
  categoryName: {
    fontWeight: 300,
  },
}));

const CategoryCard = (props) => {
  const { label, value, clearOldPostings } = props;
  const classes = useStyles();
  const history = useHistory();

  const redirect = () => {
    clearOldPostings();
    history.push({
      pathname: "/items",
      search: `category=${value}`,
    });
  };

  return (
    <div>
      <Paper elevation={0} className={classes.card} onClick={() => redirect()}>
        <img
          src={require(`../../images/categories/${value}.jpg`)}
          alt={label}
          className={classes.image}
        />
        <Typography variant="h5" className={classes.categoryName}>
          {label}
        </Typography>
      </Paper>
    </div>
  );
};

export default connect(null, { clearOldPostings })(CategoryCard);
