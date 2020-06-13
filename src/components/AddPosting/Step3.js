import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({}));

const Step3 = (props) => {
  const { change, addTag, tags, deleteTag } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.tagContainer}>
        <TextField
          label="requested"
          name="requestedItems"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              console.log("enter key");
            }
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Step3;
