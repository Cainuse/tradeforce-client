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
        position: "fixed",
      },
      links: {
        color: theme.palette.secondary.main,
        fontSize: "1.5rem",
        fontWeight: "100",
        paddingBottom: "30px",
      },
      canvasBackground: {
        position: "absolute",
        willChange: "opacity",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,.7)",
      },
      navFlyout: {
        height: "100%",
      },
      linkContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
      },
  }),
);

const Flyout = (props) => {
  return (
    <div className={props.classes.flyout} color="primary">
      <div className={props.classes.linkContainer}>
        <Link href="#" onClick={props.preventDefault} className={props.classes.links}>
          Homeware
        </Link>
        <Link href="#" onClick={props.preventDefault} className={props.classes.links}>
          Electronics
        </Link>
        <Link href="#" onClick={props.preventDefault} className={props.classes.links}>
          Necessities
        </Link>
        <Link href="#" onClick={props.preventDefault} className={props.classes.links}>
          Hobbies
        </Link>
        <Link href="#" onClick={props.preventDefault} className={props.classes.links}>
          Food/Drink
        </Link>
        <Link href="#" onClick={props.preventDefault} className={props.classes.links}>
          Miscellaneous
        </Link>
      </div>
    </div>
  )
}

export const NavFlyout = (props) => {
  const classes = flyoutStyles();
  const preventDefault = (event) => event.preventDefault();

  if (props.isOpen) {
    return (
      <div className={classes.navFlyout}>
        <div className={classes.canvasBackground}></div>
        <Flyout classes={classes} preventDefault={preventDefault}/>
      </div>
    )
  } else {
    return null;
  }
}
