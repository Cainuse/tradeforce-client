import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { HoverPopoverHOC } from "../HigherOrderComponents/HoverPopoverHOC";
import ConfirmationDialog from "../ConfirmationDialog";

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
  let { onMouseEnter, onMouseLeave, fns, offerInfo } = props;
  let { handleConfirmationOpen, setOfferInfoToActUpon } = fns;
  return (
    <React.Fragment>
      <IconButton
        className={classes.acceptBtn}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onClick={() => {
          setOfferInfoToActUpon(offerInfo);
          handleConfirmationOpen("accept");
        }}
      >
        <CheckCircleOutlineIcon className={classes.actionBtnIcon} />
      </IconButton>
    </React.Fragment>
  );
}


export default HoverPopoverHOC("Accept Offer")(AcceptIconButton);
