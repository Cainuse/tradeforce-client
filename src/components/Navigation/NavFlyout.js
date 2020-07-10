import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { closeFlyout } from "../../redux/actions/flyoutActions";
import { categories } from "../../redux/constants/classifierTypes";

const flyoutStyles = makeStyles((theme) => ({
  flyoutTranslateX: {
    width: "200px",
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    border: "none",
    padding: "100px 50px",
    position: "fixed",
    transform: "translateX(0%)",
  },
  flyoutTranslateXLeft: {
    width: "200px",
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    border: "none",
    padding: "100px 50px",
    position: "fixed",
    transform: "translateX(-100%)",
  },
  links: {
    color: theme.palette.secondary.main,
    fontSize: "1.5rem",
    fontWeight: "100",
    paddingBottom: "30px",
  },
  canvasBgTransparent: {
    position: "fixed",
    opacity: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.7)",
  },
  canvasBgOpaque: {
    position: "fixed",
    opacity: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.7)",
    visibility: "visible",
  },
  navFlyout: {
    height: "100%",
    visibility: "visible",
    position: "fixed",
    top: "0",
  },
  navFlyoutHidden: {
    height: "100%",
    visibility: "hidden",
    position: "fixed",
    top: "0",
  },
  linkContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginTop: "70px",
  },
  closeBtn: {
    left: "300px",
  },
  closeBtnIcon: {
    color: theme.palette.secondary.main,
    edge: "end",
    fontSize: "2.5rem",
    fontWeight: "100",
  },
}));

/** Helpers **/

const FlyoutLinks = (props) => {
  return (
    <div className={props.classes.linkContainer}>
      {categories.map((category, index) => {
        if (index === 0) {
          category = { value: "all", label: "All" };
        }
        return (
          <Link
            href={`items?category=${category.value}`}
            onClick={props.preventDefault}
            className={props.classes.links}
            key={index}
          >
            {category.label}
          </Link>
        );
      })}
    </div>
  );
};

//------------------------------------- Open Flyout Components --------------------------------------//

const OpenFlyout = (props) => {
  return (
    <div className={props.classes.flyoutTranslateX} color="primary">
      <FlyoutLinks classes={props.classes} />
    </div>
  );
};

const CreateOpaqueBg = (props) => {
  return (
    <div className={props.classes.canvasBgOpaque}>
      <IconButton
        edge="end"
        className={props.classes.closeBtn}
        color="inherit"
        aria-label="close"
        onClick={props.closeFlyout}
      >
        <CloseIcon className={props.classes.closeBtnIcon} />
      </IconButton>
    </div>
  );
};

//------------------------------------- Closed Flyout Components --------------------------------------//

const ClosedFlyout = (props) => {
  return (
    <div className={props.classes.flyoutTranslateXLeft} color="primary">
      <FlyoutLinks classes={props.classes} />
    </div>
  );
};

const CreateNavFlyout = (props) => {
  const classes = flyoutStyles();
  const preventDefault = (event) => event.preventDefault();

  if (props.isFlyoutOpen) {
    return (
      <div className={classes.navFlyout}>
        <CreateOpaqueBg classes={classes} closeFlyout={props.closeFlyout} />
        <OpenFlyout classes={classes} preventDefault={preventDefault} />
      </div>
    );
  } else {
    return (
      <div className={classes.navFlyoutHidden}>
        <div className={classes.canvasBgTransparent}> </div>
        <ClosedFlyout classes={classes} preventDefault={preventDefault} />
      </div>
    );
  }
};

/**
 * MAIN: NavFlyout class
 **/

class NavFlyout extends React.Component {
  handleCloseFlyout = (event) => {
    event.preventDefault();
    this.props.closeFlyout();
  };

  render() {
    return (
      <CreateNavFlyout
        isFlyoutOpen={this.props.flyoutIsOpen}
        closeFlyout={this.handleCloseFlyout}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  flyoutIsOpen: state.flyoutIsOpen,
});

const mapDispatchToProps = (dispatch) => ({
  closeFlyout: () => dispatch(closeFlyout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavFlyout);
