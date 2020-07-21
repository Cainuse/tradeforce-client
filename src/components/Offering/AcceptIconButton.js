import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { HoverPopoverHOC } from "../HigherOrderComponents/HoverPopoverHOC";

const useStyles = makeStyles((theme) => ({
  acceptBtn: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  actionBtnIcon: {
    fontSize: "1.7rem",
  },
}));

function AcceptIconButton(props) {
  let classes = useStyles();
  let {onMouseEnter, onMouseLeave} = props;

  return (
      <IconButton className={classes.acceptBtn}
                  onMouseLeave={onMouseLeave}
                  onMouseEnter={onMouseEnter}>
        <CheckCircleOutlineIcon className={classes.actionBtnIcon}/>
      </IconButton>
  );
}


export default HoverPopoverHOC("Accept Offer.")(AcceptIconButton);
