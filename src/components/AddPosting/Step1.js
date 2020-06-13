import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
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
  tagContainer: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "100%",
    border: "1px solid rgb(214, 216, 218)",
    borderRadius: "6px",
    "&:focus-within": {
      border: "1px solid #0052cc",
    },
  },
  tagInput: {
    flex: 1,
    border: "none",
    "&:focus": {
      outline: "transparent",
    },
  },
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
  const { change, tags, addTag, deleteTag } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.form}>
        <TextField
          required
          label="Title"
          className={classes.textfield}
          fullWidth
          margin="dense"
          variant="outlined"
          name="title"
          onChange={change}
          defaultValue=""
        />
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
        />
        <div className={classes.select}>
          <TextField
            required
            id="outlined-select-category-native"
            select
            label="Category"
            margin="dense"
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
            margin="dense"
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

        <TextField
          required
          label="Tags"
          className={classes.textfield}
          fullWidth
          margin="dense"
          variant="outlined"
          name="tags"
          defaultValue=""
          onKeyUp={addTag}
          placeholder={
            tags.length === 10 ? "Tag limit reached" : "Press enter to add tag"
          }
          disabled={tags.length === 10 ? true : false}
        />
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
        {/* <div className={classes.tagContainer}>
          {tags.map((tag, idx) => (
            <Chip
              key={idx}
              color="primary"
              size="small"
              onDelete={() => {
                deleteTag();
              }}
              label={tag}
            />
          ))}
          <input
            type="text"
            placeholder="Press enter to add tags"
            onKeyUp={addTag}
            className={classes.tagInput}
          />
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default Step1;
