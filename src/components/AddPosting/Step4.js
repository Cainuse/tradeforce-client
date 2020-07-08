import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ItemDetailsReview from "./ItemDetailsReview";
import Chip from "@material-ui/core/Chip";

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
  imgPreview: {
    height: 75,
    margin: theme.spacing(1),
  },
  imgContainer: {
    display: "flex",
    flexWrap: "wrap",
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
        <div className={classes.imgContainer}>
          {state.images.map((img, idx) => {
            return (
              <img
                src={img}
                key={idx}
                alt="something"
                className={classes.imgPreview}
              />
            );
          })}
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
