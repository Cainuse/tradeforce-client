import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

import TabPanel from "./TabPanel";
import TabLabel from "./TabLabel";
import ReviewList from "../Review/ReviewList";
import ItemPreviewList from "../Item/ItemPreviewList";
import Button from "@material-ui/core/Button";
import { calculateTotalNumOffersReceived } from "../Offering/OfferingHelpers";
import { OffersReceived } from "../Offering/OffersReceived";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1
  },
  tab: {
    margin: theme.spacing(0, 5)
  },
  reviewButton: {
    color: theme.palette.primary.main
  },
  reviewButtonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

class UserDetails extends React.Component {
  //TODO: Change value: 3 back to 0 in state
  constructor(props) {
    super(props);
    this.state = {
      value: 3
    };
  }

  handleChange = (e, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes, userDetail, currentUser, openReviewModal } = this.props;
    const { activePostings, offersSent } = userDetail;
    const offersSentArray = offersSent.data;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="auto tabs example"
          centered
        >
          <Tab
            label={
              <TabLabel
                value={userDetail.activePostings.length}
                title={"Item Postings"}
              />
            }
            className={classes.tab}
          />
          <Tab
            label={
              <TabLabel
                value={userDetail.inactivePostings.length}
                title={"Items Traded"}
              />
            }
            className={classes.tab}
          />
          <Tab
            label={
              <TabLabel value={userDetail.reviews.length} title={"Reviews"}/>
            }
            className={classes.tab}
          />
          {currentUser && userDetail._id === currentUser._id ? (
              <Tab
                label={<TabLabel value={calculateTotalNumOffersReceived(activePostings)} title={"Offers Received"}/>}
                className={classes.tab}
              />
          ) : null}
          {currentUser && userDetail._id === currentUser._id ? (
            <Tab
              label={<TabLabel value={offersSentArray.length} title={"Offers Sent"}/>}
              className={classes.tab}
            />
          ) : null}
        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          <ItemPreviewList items={userDetail.activePostings} sizing={2}/>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <ItemPreviewList items={userDetail.inactivePostings} sizing={2}/>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          {currentUser && userDetail._id !== currentUser._id && (
            <div className={classes.reviewButtonContainer}>
              <Button
                onClick={openReviewModal}
                className={classes.reviewButton}
              >
                Add Review
              </Button>
            </div>
          )}
          <ReviewList
            elevation={1}
            colour={"#FFFFFF"}
            reviews={userDetail.reviews}
          />
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          <OffersReceived activePostings={activePostings} />
        </TabPanel>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(UserDetails);
