import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  tags: {
    margin: theme.spacing(0.5),
  },
}));

const categories = [
  {
    value: "",
    label: "",
  },
  {
    value: "homeware",
    label: "Homeware",
  },
  {
    value: "electronics",
    label: "Electronics",
  },
  {
    value: "necessities",
    label: "Necessities",
  },
  {
    value: "hobbies",
    label: "Hobbies",
  },
  {
    value: "food drink",
    label: "Food/Drink",
  },
  {
    value: "miscellaneous",
    label: "Miscellaneous",
  },
];

const conditions = [
  {
    value: "",
    label: "",
  },
  {
    value: "brand new",
    label: "Brand New",
  },
  {
    value: "like new",
    label: "Like New",
  },
  {
    value: "good",
    label: "Good",
  },
  {
    value: "used",
    label: "Used",
  },
  {
    value: "for parts",
    label: "For Parts/Not Working",
  },
];

const Step1 = (props) => {
  const { change, state, addTag, deleteTag } = props;
  const {
    title,
    description,
    category,
    condition,
    quantity,
    tags,
    errors,
  } = state;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.form} spacing={1}>
        <Grid item xs={12}>
          <TextField
            required
            label="Title"
            className={classes.textfield}
            fullWidth
            margin="dense"
            variant="outlined"
            name="title"
            onChange={change}
            defaultValue={title}
            error={!!errors.title}
            helperText={errors.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            rows={4}
            label="Description"
            className={classes.textfield}
            fullWidth
            margin="dense"
            variant="outlined"
            name="description"
            onChange={change}
            defaultValue={description}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
            onChange={change}
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
        <Grid item xs={12} sm={6}>
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
            onChange={change}
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
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tags"
            className={classes.textfield}
            fullWidth
            margin="dense"
            variant="outlined"
            name="tags"
            defaultValue=""
            onKeyUp={addTag}
            placeholder={
              tags.length === 10
                ? "Tag limit reached"
                : "Press enter to add tag"
            }
            disabled={tags.length >= 10}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Quantity"
            className={classes.textfield}
            fullWidth
            margin="dense"
            variant="outlined"
            name="quantity"
            defaultValue={quantity}
            onChange={change}
            type="number"
            inputProps={{ min: "1" }}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
        </Grid>
        {tags.map((tag, idx) => (
          <Chip
            key={idx}
            color="primary"
            size="small"
            onDelete={() => {
              deleteTag("tags", idx);
            }}
            label={tag}
            className={classes.tags}
          />
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default Step1;
