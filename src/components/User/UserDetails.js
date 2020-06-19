import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

import TabPanel from "./TabPanel";
import TabLabel from "./TabLabel";
import ReviewList from "../Review/ReviewList";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  tab: {
    margin: theme.spacing(0, 5),
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
    const { classes } = this.props;
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
            label={<TabLabel value={12} title={"Item Postings"} />}
            className={classes.tab}
          />
          <Tab
            label={<TabLabel value={42} title={"Items Traded"} />}
            className={classes.tab}
          />
          <Tab
            label={<TabLabel value={30} title={"Reviews"} />}
            className={classes.tab}
          />
          {1 < 4 ? null : (
            <Tab
              label={<TabLabel value={6} title={"Offers"} />}
              className={classes.tab}
            />
          )}
        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <ReviewList elevation={1} colour={"#FFFFFF"} />
        </TabPanel>
        <TabPanel value={this.state.value} index={4}>
          Item Three
        </TabPanel>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(UserDetails);
