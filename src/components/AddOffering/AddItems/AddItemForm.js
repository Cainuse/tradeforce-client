import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { categories, conditions } from "../../constants/ComponentConstants";
import ItemImagesUpload from "./ItemImagesUpload";


const useStyles = makeStyles((theme) => ({
  addItemSection: {
    marginTop: "30px",
  },
  comment: {
    outline: "none",
    marginBottom: "20px",
  },
  formSection: {
    marginBottom: "20px",
  },
  formHeader: {
    color: theme.palette.primary.main,
    paddingBottom: "10px",
  },
  form: {
    width: "100%",
    minHeight: "270px",
    marginBottom: theme.spacing(3),
    flexGrow: 1,
  },
  textField: {},
  addBtnContainer: {
    justifySelf: "flex-end",
  },
  addBtn: {
    fontWeight: 300,
    textTransform: "capitalize",
    justifySelf: "flex-end",
    margin: "5px",
  },
}));

export const AddItemForm = (props) => {
  let classes = useStyles();
  let {item, errors} = props.state;
  let {nameOfItem, quantity, images, description, category, condition} = item;

  return (
    <div className={classes.addItemSection}>
      <Typography variant="h6" className={classes.formHeader}>
        Add an Item
      </Typography>

      <Grid container className={classes.form} spacing={1}>
        <Grid item xs={12}>
          <TextField
            required
            label="Name of Item"
            className={classes.textField}
            fullWidth
            margin="dense"
            variant="outlined"
            name="nameOfItem"
            onChange={props.handleChangeForm}
            defaultValue={nameOfItem}
            error={!!errors.nameOfItem}
            helperText={errors.nameOfItem}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            rows={3}
            label="Description"
            className={classes.textfield}
            fullWidth
            margin="dense"
            variant="outlined"
            name="description"
            onChange={props.handleChangeForm}
            defaultValue={description}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={3} sm={6}>
          <TextField
            required
            id="outlined-select-category-native"
            select
            label="Category"
            margin="dense"
            fullWidth
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            onChange={props.handleChangeForm}
            name="category"
            defaultValue={category}
            error={!!errors.category}
            helperText={errors.category}
          >
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3} sm={6}>
          <TextField
            required
            id="outlined-select-condition-native"
            select
            label="Condition"
            margin="dense"
            fullWidth
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            onChange={props.handleChangeForm}
            name="condition"
            defaultValue={condition}
            error={!!errors.condition}
            helperText={errors.condition}
          >
            {conditions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Quantity"
            className={classes.textfield}
            fullWidth
            margin="dense"
            variant="outlined"
            name="quantity"
            defaultValue={quantity}
            onChange={props.handleChangeForm}
            type="number"
            inputProps={{ min: "1" }}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
        </Grid>
        <Grid item xs={12}>
          <ItemImagesUpload images={images} />
        </Grid>
        <Grid container item justify={"flex-end"} xs={12}>
          <Button
            color="primary"
            variant={"contained"}
            className={classes.addBtn}
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() => {
              props.handleSubmitAddItem();
            }}
          >
            Add Item
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};