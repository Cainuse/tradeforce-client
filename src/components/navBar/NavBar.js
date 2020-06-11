import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Logo } from "../Logo";
import { ActionItems } from "./actionBtns/ActionButtons";
import SearchBar from "../Item/SearchBar";
import { NavFlyout } from "./NavFlyout";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100000,
  },
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
}));

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flyoutIsOpen: false,
    };
  }


  render() {
    return <CreateNavBar />
  }
}

function CreateNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Logo className={classes.logo} />
          <SearchBar></SearchBar>
          <ActionItems isLoggedIn={true} />
        </Toolbar>
      </AppBar>
      <NavFlyout isOpen={true}/>
    </div>
  );
}

export default NavBar;