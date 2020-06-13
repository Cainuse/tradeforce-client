import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  form: {
    height: "80%",
  },
  select: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textfieldDropdown: {
    width: "49%",
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
  const { change } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.form}>
        <TextField
          required
          label="Title"
          className={classes.textfield}
          fullWidth
          margin="normal"
          variant="outlined"
          name="title"
          onChange={change}
        />
        <TextField
          required
          multiline
          rows={4}
          label="Description"
          className={classes.textfield}
          fullWidth
          margin="normal"
          variant="outlined"
          name="description"
          onChange={change}
        />
        <div className={classes.select}>
          <TextField
            required
            id="outlined-select-category-native"
            select
            label="Category"
            margin="normal"
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            onChange={change}
            name="category"
            className={classes.textfieldDropdown}
          >
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            required
            id="outlined-select-condition-native"
            select
            label="Condition"
            margin="normal"
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            onChange={change}
            name="condition"
            className={classes.textfieldDropdown}
          >
            {conditions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Step1;
