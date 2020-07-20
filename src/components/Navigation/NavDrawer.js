import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import { closeFlyout } from "../../redux/actions/flyoutActions";
import { categories } from "../../redux/constants/classifierTypes";

const flyoutStyles = makeStyles((theme) => ({
  paper: {
    width: "200px",
    height: "100%",
    border: "none",
    padding: theme.spacing(5),
    background: theme.palette.primary.main,
  },
  links: {
    color: theme.palette.secondary.main,
    fontSize: "1.5rem",
    fontWeight: "100",
    paddingBottom: "30px",
  },
  linkContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const NavDrawer = (props) => {
  const classes = flyoutStyles();

  return (
    <Drawer
      anchor="left"
      open={props.flyoutIsOpen}
      onClose={props.closeFlyout}
      classes={{ paper: classes.paper }}
    >
      <div className={classes.linkContainer}>
        {categories.map((category, index) => {
          if (index === 0) {
            category = { value: "all", label: "All" };
          }
          return (
            <Link
              href={`/items?category=${category.value}`}
              key={index}
              className={classes.links}
            >
              {category.label}
            </Link>
          );
        })}
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  flyoutIsOpen: state.flyoutIsOpen,
});

const mapDispatchToProps = (dispatch) => ({
  closeFlyout: () => dispatch(closeFlyout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);
