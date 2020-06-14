import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  tags: {
    fontSize: "20px",
    margin: theme.spacing(1, 0),
  },
  chipContainer: {
    width: "50%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Step3 = (props) => {
  const { requests, addRequest, deleteRequest } = props;

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
        onKeyUp={addRequest}
        placeholder={
          requests.length >= 5
            ? "Request limit reached"
            : "Press enter to add request"
        }
        disabled={requests.length >= 5}
      />
      <div className={classes.chipContainer}>
        {requests.map((tag, idx) => (
          <Chip
            key={idx}
            color="primary"
            onDelete={() => {
              deleteRequest("requestedItems", idx);
            }}
            label={tag}
            className={classes.tags}
            variant="outlined"
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Step3;
