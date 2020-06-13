import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({}));

const Step2 = (props) => {
  const { change } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.form}>
        <Box>Step 2: here we will upload the images</Box>
        <Button onClick={change}>Some button here</Button>
      </div>
    </React.Fragment>
  );
};

export default Step2;
