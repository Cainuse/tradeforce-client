import { AddItemForm } from "./AddItemForm";
import { Grid, IconButton } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
        images={props.images}
        handleChangeForm={props.handleChangeForm}
        handleSubmitAddItem={props.handleClickAddItem}
      />
    );
  } else {
    return (
      <Grid container justify={"flex-end"} spacing={1}>
        <Grid item>
          <IconButton
            edge="start"
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
