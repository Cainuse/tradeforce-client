import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loadPostingsByQuery } from "../../redux/actions/postingActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "75%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "70%",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function CustomizedInputBase(props) {
  const classes = useStyles();
  const history = useHistory();
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.loadPostingsByQuery(`search=${input}`);
    history.push({
      pathname: "/items",
      search: `search=${input}`,
    });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="I am looking for"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={handleChange}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}

export default connect(null, { loadPostingsByQuery })(CustomizedInputBase);
