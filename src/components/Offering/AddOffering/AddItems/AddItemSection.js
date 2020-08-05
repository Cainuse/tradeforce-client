import { Grid, IconButton } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AddItemForm } from "./AddItemForm";

const useStyles = makeStyles((theme) => ({
  addCircleIcon: {
    color: theme.palette.primary.main,
    fontSize: "1.6rem",
  },
}));

export const AddItemSection = (props) => {
  let classes = useStyles();

  if (props.showForm) {
    return (
      <AddItemForm
        state={props.state}
        handleChange={props.handleChange}
        handleSubmitAddItem={props.handleClickAddItem}
        addImage={props.addImage}
        deleteImage={props.deleteImage}
      />
    );
  } else {
    return (
      <Grid container justify={"flex-end"} direction={"row"} spacing={1}>
        <Grid container item xs={11}></Grid>
        <Grid container item xs={1}>
          <IconButton
            className={classes.addCircleIcon}
            color="inherit"
            aria-label="showAddItemFormBtn"
            onClick={props.handleClickAddIcon}
          >
            <AddCircleOutlineOutlinedIcon className={classes.addCircleIcon} />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
};
