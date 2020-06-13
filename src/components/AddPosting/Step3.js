import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({}));

const Step3 = (props) => {
  const { addTag, tags, deleteTag } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <TextField
        required
        label="Requested Items"
        className={classes.textfield}
        fullWidth
        margin="dense"
        variant="outlined"
        name="requestedItems"
        defaultValue=""
        onKeyUp={addTag}
        placeholder="Press enter to add request"
      />
      {/* {tags.map((item, idx) => (
        <Chip
          key={idx}
          color="primary"
          size="small"
          onDelete={() => {
            deleteTag("requestedItems", idx);
          }}
          label={item}
          className={classes.tags}
        />
      ))} */}
    </React.Fragment>
  );
};

export default Step3;
