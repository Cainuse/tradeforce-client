import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ItemDetailsReview from "./ItemDetailsReview";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

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
  const [expandedIdx, setExpandedIdx] = useState(-1);

  const handleExpand = (currIdx) => {
    expandedIdx === currIdx ? setExpandedIdx(-1) : setExpandedIdx(currIdx);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <ExpandableSection
          sectionTitle="Item Details"
          returnToActiveStep={returnToActiveStep}
          handleExpand={handleExpand}
          panelIdx={0}
          expandedIdx={expandedIdx}
        >
          <ItemDetailsReview state={state} />
        </ExpandableSection>
        <ExpandableSection
          sectionTitle="Images"
          returnToActiveStep={returnToActiveStep}
          handleExpand={handleExpand}
          panelIdx={1}
          expandedIdx={expandedIdx}
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
          handleExpand={handleExpand}
          panelIdx={2}
          expandedIdx={expandedIdx}
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
      </Grid>
    </React.Fragment>
  );
};

export default Step4;
