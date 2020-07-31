import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadPostingsByQuery,
  clearOldPostings,
} from "../../redux/actions/postingActions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { categories, conditions } from "../../redux/constants/classifierTypes";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import clsx from "clsx";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "75%",
  },
  search: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "87%",
  },
  iconButton: {
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "25%",
  },
  options: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  optionsHidden: {
    visibility: "hidden",
  },
  helperText: {
    color: theme.palette.primary.main,
  },
  clearFormBtn: {
    textTransform: "none",
    fontWeight: 400,
    marginBottom: theme.spacing(1),
  },
}));

function CustomizedInputBase(props) {
  const classes = useStyles();
  const history = useHistory();
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("any");
  const [condition, setCondition] = useState("any");
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [noActiveOptions, setNoActiveOptions] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.clearOldPostings();
    let searchString = "";
    if (input !== "") {
      searchString = searchString.concat(`search=${input}`);
    }
    if (condition !== "" && condition !== "any") {
      searchString = searchString.concat(`&condition=${condition}`);
    }
    if (category !== "" && category !== "any") {
      searchString = searchString.concat(`&category=${category}`);
    }
    await props.loadPostingsByQuery({query: searchString});
    history.push({
      pathname: "/items",
      search: searchString,
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "input") {
      setInput(e.target.value);
    } else if (e.target.name === "condition") {
      setCondition(e.target.value);
    } else if (e.target.name === "category") {
      setCategory(e.target.value);
    }
  };

  const checkActiveOptions = () => {
    if (category !== "any" || condition !== "any") {
      setNoActiveOptions(false);
    } else {
      setNoActiveOptions(true);
    }
  };

  const clearForm = () => {
    setInput("");
    setCondition("any");
    setCategory("any");
  };

  const toggleOptionMenu = () => {
    if (isOptionOpen) {
      checkActiveOptions();
    }
    setOptionOpen(!isOptionOpen);
  };

  return (
    <div className={classes.root}>
      <Paper component="form" className={classes.search}>
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          onClick={toggleOptionMenu}
        >
          {isOptionOpen ? (
            <CloseIcon />
          ) : (
            <Badge
              color="primary"
              variant="dot"
              invisible={noActiveOptions}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MenuIcon />
            </Badge>
          )}
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="I am looking for"
          inputProps={{ "aria-label": "search google maps" }}
          name={"input"}
          onChange={handleChange}
          value={input}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <div
        className={
          isOptionOpen
            ? classes.options
            : clsx(classes.options, classes.optionsHidden)
        }
      >
        <FormControl className={classes.formControl}>
          <Select value={condition} onChange={handleChange} name={"condition"}>
            {conditions.map((obj, idx) => {
              let { value, label } = obj;
              if (idx === 0) {
                label = "Any";
                value = "any";
              }
              return (
                <MenuItem key={idx} value={value}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText className={classes.helperText}>
            Condition
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select value={category} onChange={handleChange} name={"category"}>
            {categories.map((obj, idx) => {
              let { value, label } = obj;
              if (idx === 0) {
                label = "Any";
                value = "any";
              }
              return (
                <MenuItem key={idx} value={value}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText className={classes.helperText}>
            Category
          </FormHelperText>
        </FormControl>
        <Button onClick={clearForm} className={classes.clearFormBtn}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export default connect(null, { loadPostingsByQuery, clearOldPostings })(
  CustomizedInputBase
);
