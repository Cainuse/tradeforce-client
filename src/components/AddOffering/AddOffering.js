import React from "react";
import { connect } from "react-redux";
import CreateOfferContents from "./OfferingContents";
import { withStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Paper } from "@material-ui/core";
import { TabPanel } from "./TabPanels";

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
      currTabIdx: 0,
      addedItems: [
        {
          nameOfItem: "name",
          quantity: 2,
          images: [],
          description: "description",
          category: "Electronics",
          condition: "Brand new",
        },
        {
          nameOfItem: "name2",
          quantity: 1,
          images: [],
          description: "description2",
          category: "Electronics2",
          condition: "Brand new2",
        },
      ],
      // addedItems: [],
      comment: "",
      nameOfItem: "",
      quantity: 1,
      images: [],
      description: "",
      category: "",
      condition: "",
      errors: {
        addedItems: "",
        comment: "",
        nameOfItem: "",
        description: "",
        category: "",
        condition: "",
        quantity: "",
      },
    };
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ currTabIdx: newValue });
  };

  handleChangeForm = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  clearAddItemForm = () => {
    this.setState({
      nameOfItem: "",
      quantity: 1,
      images: [],
      description: "",
      category: "",
      condition: "",
    });
  };

  addItemToList = () => {
    let item = {};
    let {
      nameOfItem,
      quantity,
      images,
      description,
      category,
      condition,
    } = this.state;

    item["nameOfItem"] = nameOfItem;
    item["quantity"] = parseInt(quantity);
    item["images"] = images;
    item["description"] = description;
    item["category"] = category;
    item["condition"] = condition;

    let newArr = this.state.addedItems;
    newArr.push(item);
    this.setState({ addedItems: newArr });
    this.clearAddItemForm();
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Typography align="center" variant="h4" className={classes.modalHeader}>
          Make an Offer
        </Typography>

        <Tabs
          className={classes.tabsRoot}
          value={this.state.currTabIdx}
          indicatorColor={"primary"}
          textColor={"primary"}
          onChange={this.handleChangeTab}
        >
          <Tab label="Create Offering" />
          <Tab label="Preview" />
        </Tabs>

        <TabPanel value={this.state.currTabIdx} index={0}>
          <CreateOfferContents
            images={this.state.images}
            addedItems={this.state.addedItems}
            handleChangeForm={this.handleChangeForm}
            addItemToList={this.addItemToList}
          />
        </TabPanel>
        <TabPanel value={this.state.currTabIdx} index={1}>
          Item Two
        </TabPanel>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(withStyles(useStyles)(AddOffering));
