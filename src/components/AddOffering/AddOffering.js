import React from "react";
import { connect } from "react-redux";
import CreateOfferContents from "./CreateOfferContents";
import { withStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Grid, Paper } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container >
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      )}
    </div>
  );
}


const useStyles = (theme) => ({
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    position: "relative",
  },
  tabsRoot: {
    marginBottom: "30px",
    outline: "display",
  },
  modalHeader: {
    paddingBottom: "20px",
  },

});


/**
 * MAIN: AddOffering Component
 **/

class AddOffering extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      addedItems: [],
      comment: "",
      nameOfItem: "",
      quantity: 1,
      images: [],
      description: "",
      category: "",
      condition: "",
      tags: [],
      errors: {
        addedItems: "",
        comment: "",
        nameOfItem: "",
        description: "",
        category: "",
        condition: "",
        quantity: "",
      },
    }
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ value: newValue})
  }

  render() {
    const { classes } = this.props;

    return <Paper className={classes.paper}>

      <Typography align="center" variant="h4" className={classes.modalHeader}>
        Make an Offer
      </Typography>

      <Tabs className={classes.tabsRoot}
            value={this.state.value}
            indicatorColor={"primary"}
            textColor={"primary"}
            onChange={this.handleChangeTab}
      >
        <Tab label="Create Offering" />
        <Tab label="Preview" />
      </Tabs>

      <TabPanel value={this.state.value} index={0} >
        <CreateOfferContents images={this.state.images}/>
      </TabPanel>
      <TabPanel value={this.state.value} index={1} >
        Item Two
      </TabPanel>

    </Paper>;
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(withStyles(useStyles)(AddOffering));
