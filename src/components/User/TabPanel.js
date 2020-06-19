import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  panel: {
    backgroundColor: "#F4F4F4",
    fontFamily: "Montserrat",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`force-tab-${index}`}
      {...other}
      className={classes.panel}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default TabPanel;
