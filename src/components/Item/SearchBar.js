import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = () => ({
  inputForm: {
    top: "10%",
    left: "10px",
    color: "white",
  },
  textField: {
    width: "50%",
    backgroundColor: "white",
  },
  iconButton: {
    top: "10px",
    color: "white",
  },
  searchOption: {
    top: "10px",
    color: "white",
  },
});

// I have... I am looking for...
class SearchBar extends Component {
  state = {
    anchorEl: null,
    textFieldPlaceholder: "I am looking for",
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  updateTextFieldPlaceHolder = (newText) => {
    this.setState({ anchorEl: null });
    this.setState({ textFieldPlaceholder: newText });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.inputForm}>
          <Box>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.searchOption}
            >
              Search By
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.updateTextFieldPlaceHolder}
            >
              <MenuItem
                onClick={() => {
                  this.updateTextFieldPlaceHolder("I am looking for...");
                }}
              >
                I am looking for...
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.updateTextFieldPlaceHolder("I have...");
                }}
              >
                I have...
              </MenuItem>
            </Menu>

            <TextField
              className={classes.textField}
              id="input-field"
              label={this.state.textFieldPlaceholder}
              color="primary"
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles)(SearchBar);
