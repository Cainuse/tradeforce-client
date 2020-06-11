import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link"
import { connect } from "react-redux";

const flyoutStyles = makeStyles(theme => ({
      flyoutTranslateX: {
        width: "200px",
        height: "80%",
        backgroundColor: theme.palette.primary.main,
        border: "none",
        padding: "100px 50px",
        position: "fixed",
        transform: "translateX(0%)",
      },
      flyoutTranslateXLeft: {
        width: "200px",
        height: "80%",
        backgroundColor: theme.palette.primary.main,
        border: "none",
        padding: "100px 50px",
        position: "fixed",
        transform: "translateX(-100%)"
      },
      links: {
        color: theme.palette.secondary.main,
        fontSize: "1.5rem",
        fontWeight: "100",
        paddingBottom: "30px",
      },
      canvasBgTransparent: {
        position: "absolute",
        opacity: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,.7)",
      },
      canvasBgOpaque: {
        position: "absolute",
        opacity: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,.7)",
        visibility: "visible",
      },
      navFlyout: {
        height: "100%",
        visibility: "visible",
        position: "fixed",
        top: "50px",
      },
      navFlyoutHidden: {
        height: "100%",
        visibility: "hidden",
        position: "fixed",
        top: "50px",
      },
      linkContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
      },
  }),
);

const FlyoutLinks = (props) => {
  return (
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
  )
}

const OpenFlyout = (props) => {
  return (
    <div className={props.classes.flyoutTranslateX} color="primary">
      <FlyoutLinks classes={props.classes} />
    </div>
  )
}

const ClosedFlyout = (props) => {
  return (
    <div className={props.classes.flyoutTranslateXLeft} color="primary">
      <FlyoutLinks classes={props.classes} />
    </div>
  )
}

const CreateNavFlyout = (props) => {
  const classes = flyoutStyles();
  const preventDefault = (event) => event.preventDefault();

  if (props.isFlyoutOpen) {
    return (
      <div className={classes.navFlyout}>
        <div className={classes.canvasBgOpaque}> </div>
        <OpenFlyout classes={classes} preventDefault={preventDefault} />
      </div>
    )
  } else {
    return (
      <div className={classes.navFlyoutHidden}>
        <div className={classes.canvasBgTransparent}> </div>
        <ClosedFlyout classes={classes} preventDefault={preventDefault} />
      </div>
    )
  }
}

class NavFlyout extends React.Component {
  render() {
    return <CreateNavFlyout isFlyoutOpen={this.props.flyoutIsOpen}/>;
  }
}

const mapStateToProps = state => ({
  flyoutIsOpen: state.flyoutIsOpen,
})

export default connect(mapStateToProps)(NavFlyout);


