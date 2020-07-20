import React, { useState } from "react";
import { Grid, Typography, Link, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { OfferingPreviewList } from "./OfferingPreviewList";

const useStyles = makeStyles((theme) => ({
  allOffersContainer: {
    padding:"40px",
    minHeight: "50vh",
  },
  postingOffers: {
    paddingBottom: "35px",
  },
  postingTitle: {
    fontSize: "1.5rem",
    color: theme.palette.primary.main,
  },
  numOffering: {
    fontSize: "1.5rem",
    color: theme.palette.primary.main,
  },
  title: {
    display: "inherit",
  },
}))

export const OffersReceived = (props) => {
  let classes = useStyles();
  let { activePostings } = props;
  let [expanded, setExpanded] = useState(-1);

  const handleExpand = (index) => {
    expanded === index ? setExpanded(-1) : setExpanded(index);
  }

  const renderAllOfferings = () => {
    return activePostings.map((activePosting, index) => {
      let offerings = activePosting.offerings;

      if (offerings.length > 0) {
        return (
          <Grid container key={index} className={classes.postingOffers} spacing={1}>
            <Grid container item xs={12} key={index} justify={"center"}>
              <Grid item xs={10} className={classes.title}>
              <Typography className={classes.postingTitle}>
                Posting: {activePosting.title}
              </Typography>
              <Typography className={classes.numOffering}>
                &nbsp;(Offers: {offerings.length})
              </Typography>
              </Grid>
              <Grid container item xs={2} justify={"center"} >
                { expanded === index ?
                  <Link onClick={() => handleExpand(index)}>(Collapse)</Link> :
                  <Link onClick={() => handleExpand(index)}> (Expand) </Link>}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={index === expanded}>
                <OfferingPreviewList offerings={offerings}/>

              </Collapse>
            </Grid>
          </Grid>);
      }
      return null;
    });

  };

  return (
    <Grid container
          // spacing={4}
          justify={"center"}
          alignContent={"flex-start"}
          className={classes.allOffersContainer}
    >
      {renderAllOfferings()}
    </Grid>
  );
};