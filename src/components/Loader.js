import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#F8F8F8AD",
    zIndex: 2000,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
}));

const Loader = (props) => {
  const classes = useStyles();
  return (
    props.loading && (
      <div className={classes.root}>
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Loader);
