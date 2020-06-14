import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({}));

const Step4 = (props) => {
  const { state } = props;
  const { title, description, category, condition, quantity, tags } = state;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.form}>
        <Box>Step 4: Review the user provided inputs</Box>
      </div>
    </React.Fragment>
  );
};

export default Step4;
