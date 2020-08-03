import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Logo } from "../../Logo";
import ActionButtons from "./ActionBtns/ActionButtons";
import { clickMenuBtn } from "../../../redux/actions/flyoutActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  navBarRoot: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    flexGrow: 1,
  },
  menuIcon: {
    fontSize: "2rem",
  },
  appBar: {
    background: theme.palette.primary.main,
  },
  loginBtn: {
    fontSize: "1.2rem",
    fontWeight: "100",
    textTransform: "lowercase",
  },
  flyoutRoot: {
    visibility: "hidden",
  },
}));

class NavBar extends React.Component {
  handleMenuClick = (event) => {
    event.preventDefault();
    this.props.clickMenuBtn();
  };

  render() {
    return (
      <CreateNavBar
        isLoggedIn={this.props.currentUser.user !== null}
        handleMenuClick={this.handleMenuClick}
      />
    );
  }
}

function CreateNavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.navBarRoot}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.handleMenuClick}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Logo className={classes.logo} />
          <ActionButtons isLoggedIn={props.isLoggedIn} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clickMenuBtn: () => dispatch(clickMenuBtn()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
