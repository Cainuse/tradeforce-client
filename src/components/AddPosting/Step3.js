import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({
  tag: {
    fontSize: "20px",
  },
}));

const Step3 = (props) => {
  const { change, requests, addRequest, deleteRequest } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <TextField
        required
        label="Tags"
        className={classes.textfield}
        fullWidth
        margin="dense"
        variant="outlined"
        name="requestedItems"
        defaultValue=""
        onKeyUp={addRequest}
      />
      {requests.map((tag, idx) => (
        <Chip
          key={idx}
          color="primary"
          onDelete={() => {
            deleteRequest("requestedItems", idx);
          }}
          label={tag}
          className={classes.tags}
        />
      ))}
    </React.Fragment>
  );
};

export default Step3;
