import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ItemDetailsReview from "./ItemDetailsReview";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import ExpandableSection from "./ExpandableSection";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 300,
    fontSize: "1.2rem",
  },
  chips: {
    margin: theme.spacing(0.5),
  },
  staticTitle: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

const Step4 = (props) => {
  const { state, returnToActiveStep } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <ExpandableSection
        sectionTitle="Item Details"
        returnToActiveStep={returnToActiveStep}
      >
        <ItemDetailsReview state={state} />
      </ExpandableSection>
      <ExpandableSection
        sectionTitle="Images"
        returnToActiveStep={returnToActiveStep}
      >
        <div>
          {state.images.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      </ExpandableSection>
      <ExpandableSection
        sectionTitle="Requested Items"
        returnToActiveStep={returnToActiveStep}
      >
        {state.requestedItems.length === 0 || !state.requestedItems ? (
          <Typography>No requested items specified for exchange</Typography>
        ) : (
          state.requestedItems.map((item, idx) => (
            <Chip
              key={idx}
              color="primary"
              variant="outlined"
              label={item}
              className={classes.chips}
            />
          ))
        )}
      </ExpandableSection>
    </React.Fragment>
  );
};

export default Step4;
