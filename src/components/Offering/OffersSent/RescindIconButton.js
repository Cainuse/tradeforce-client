import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import { HoverPopoverHOC } from "../../HigherOrderComponents/HoverPopoverHOC";

const useStyles = makeStyles(() => ({
  rescindIcon: {
    fontSize: "1.7rem"
  },
}));


function RescindIconButton(props) {
  let classes = useStyles();
  let { offerInfo, fns, disabled, onMouseEnter, onMouseLeave } = props;
  let { handleConfirmationOpen, setOfferInfoToActUpon } = fns;

  return (
    <React.Fragment>
      <IconButton
        className={classes.acceptBtn}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        disabled={disabled}
        onClick={() => {
          setOfferInfoToActUpon(offerInfo);
          handleConfirmationOpen();
        }}
      >
        <RotateLeftIcon className={classes.actionBtnIcon} />
      </IconButton>
    </React.Fragment>
  );
}

export default HoverPopoverHOC("Rescind Offer")(RescindIconButton);
