import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import { HoverPopoverHOC } from "../HigherOrderComponents/HoverPopoverHOC";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles(() => ({
  actionBtnIcon: {
    fontSize: "1.7rem",
  },
  declineBtn: {
    color: "#b90202",
    borderColor: "#b90202",
  },
}));

function DeclineIconButton(props) {
  let classes = useStyles();
  let {onMouseEnter, onMouseLeave} = props;

  return (
    <IconButton className={classes.declineBtn}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
    >
      <HighlightOffIcon className={classes.actionBtnIcon}/>
    </IconButton>
  );
}


export default HoverPopoverHOC("Decline Offer.")(DeclineIconButton);