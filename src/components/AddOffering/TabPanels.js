import { Grid } from "@material-ui/core";
import React from "react";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      )}
    </div>
  );
}
