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

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  tab: {
    margin: theme.spacing(0, 5),
  },
  reviewButton: {
    color: theme.palette.primary.main,
  },
  reviewButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (e, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes, userDetail, currentUser, openReviewModal } = this.props;
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
              <TabLabel value={userDetail.reviews.length} title={"Reviews"} />
            }
            className={classes.tab}
          />
          {userDetail._id === currentUser._id ? (
            <Tab
              label={<TabLabel value={6} title={"Offers"} />}
              className={classes.tab}
            />
          ) : null}
        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          <ItemPreviewList items={userDetail.activePostings} />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <ItemPreviewList items={userDetail.inactivePostings} />
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          {userDetail._id !== currentUser._id && (
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
          Item Three
        </TabPanel>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(UserDetails);
