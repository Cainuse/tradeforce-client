import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link"

const flyoutStyles = makeStyles(theme => ({
      flyout: {
        width: "200px",
        height: "80%",
        backgroundColor: theme.palette.primary.main,
        border: "none",
        padding: "100px 50px",
      },
      links: {
        color: theme.palette.secondary.main,
        fontSize: "1.5rem",
        fontWeight: "200"
      }
  })
);

export const NavFlyout = (props) => {
  const classes = flyoutStyles();
  const preventDefault = (event) => event.preventDefault();

  if (props.isOpen) {
    return (
      <div className={classes.flyout} color="primary">
        <Link href="#" onClick={preventDefault} className={classes.links}>
            Homeware
        </Link>
      </div>
    )
  } else {
    return null;
  }
}
