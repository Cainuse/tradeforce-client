import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({}));

const Step3 = (props) => {
  const { change } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.form}>
        <Box>Final Step: returns the url to the newly created posting</Box>
      </div>
    </React.Fragment>
  );
};

export default Step3;
