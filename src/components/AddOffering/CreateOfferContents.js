import {
  Grid,
  TextField,
  IconButton,
  Typography,
  Collapse,
} from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { AddItemForm } from "./AddItemForm";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

const useStyles = (theme) => ({
  formSection: {
    marginBottom: "20px",
  },
  section: {
    marginBottom: "5px",
  },
  formHeader: {
    color: theme.palette.primary.main,
    paddingBottom: "10px",
  },
  form: {
    width: "100%",
    minHeight: "270px",
    marginBottom: theme.spacing(3),
    flexGrow: 1,
  },
  addCircleIcon: {
    color: theme.palette.primary.main,
    fontSize: "1.6rem",
  },
  itemContainer: {
    minWidth: "300px",
  },
  itemCard: {
    borderLeftColor: "#6AB547",
    borderLeft: "solid",
    borderWidth: "4px",
    backgroundColor: "#fafafa",
  },
  itemName: {
    "& > *": {
      "& > *": {
        fontSize: "1rem",
        fontWeight: "500",
        textTransform: "capitalize",
      },
    },
  },
  expandIconContainer: {
    display: "inline-grid",
    justifyItems: "center",
    alignContent: "center",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
});

const AddItemSection = (props) => {
  if (props.showForm) {
    return (
      <AddItemForm
        images={props.images}
        handleChangeForm={props.handleChangeForm}
        handleSubmitAddItem={props.handleClickAddItem}
      />
    );
  } else {
    return (
      <Grid container justify={"flex-end"} spacing={1}>
        <Grid item>
          <IconButton
            edge="start"
            className={props.classes.addCircleIcon}
            color="inherit"
            aria-label="showAddItemFormBtn"
            onClick={props.handleClickAddIcon}
          >
            <AddCircleOutlineOutlinedIcon
              className={props.classes.addCircleIcon}
            />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
};

const createAddedItemList = (
  expandedPanelIdx,
  addedItems,
  classes,
  handleExpand
) => {
  //TODO: Delete example of an addItem
  // {
  //   comment: "lol",
  //     nameOfItem: "name",
  //   quantity: 2,
  //   images: [],
  //   description: "description",
  //   category: "Electronics",
  //   condition: "Brand new"
  // },
  return addedItems.map((item, index) => {
    return (
      <Grid item xs={12} key={index} className={classes.itemContainer}>
        <Card key={index} className={classes.itemCard}>
          <Grid container alignContent={"center"}>
            <Grid item xs={10}>
              <CardHeader
                className={classes.itemName}
                title={item.nameOfItem}
              />
            </Grid>

            <Grid item xs={2} className={classes.expandIconContainer}>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: index === expandedPanelIdx,
                })}
                onClick={() => {
                  handleExpand(index);
                }}
                aria-expanded={index === expandedPanelIdx}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>

            <Collapse in={index === expandedPanelIdx}>
              <CardContent>{item.comment}</CardContent>
            </Collapse>
          </Grid>
        </Card>
      </Grid>
    );
  });
};

const ItemSection = (props) => {
  const [expandedPanelIdx, setExpandedIdx] = React.useState(-1);
  const [showForm, setShowForm] = React.useState(
    props.addedItems.length === 0 ? true : false
  );

  const handleExpand = (index) => {
    expandedPanelIdx === index ? setExpandedIdx(-1) : setExpandedIdx(index);
  };

  const handleClickAddItem = () => {
    props.addItemToList();
    setShowForm(false);
    //TODO: do all the other stuff with state
  };

  const handleClickAddIcon = () => {
    setShowForm(true);
  };

  if (props.addedItems.length === 0) {
    return (
      <div className={props.classes.formSection}>
        <AddItemSection
          images={props.images}
          handleChangeForm={props.handleChangeForm}
          handleClickAddIcon={handleClickAddIcon}
          handleClickAddItem={handleClickAddItem}
          showForm={showForm}
          classes={props.classes}
        />
      </div>
    );
  } else {
    return (
      <div className={props.classes.formSection}>
        <Grid container spacing={1} className={props.classes.section}>
          <Typography
            variant={"h6"}
            color={"primary"}
            className={props.classes.formHeader}
          >
            Added Items
          </Typography>

          <Grid container spacing={1}>
            {createAddedItemList(
              expandedPanelIdx,
              props.addedItems,
              props.classes,
              handleExpand
            )}
          </Grid>
        </Grid>

        <AddItemSection
          images={props.images}
          handleChangeForm={props.handleChangeForm}
          handleClickAddIcon={handleClickAddIcon}
          handleClickAddItem={handleClickAddItem}
          showForm={showForm}
          classes={props.classes}
        />
      </div>
    );
  }
};

class CreateOfferContents extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.form}>
        {/*TODO: Separate into "Comment" section*/}
        <div className={classes.formSection}>
          <Typography variant="h6" className={classes.formHeader}>
            Comment
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                multiline
                rows={3}
                label="Comment"
                className={classes.textfield}
                fullWidth
                margin="dense"
                variant="outlined"
                name="comment"
                onChange={this.props.handleChangeForm}
                // defaultValue={description}
                // error={!!errors.description}
                // helperText={errors.description}
              />
            </Grid>
          </Grid>
        </div>

        <ItemSection
          classes={classes}
          addedItems={this.props.addedItems}
          images={this.props.images}
          handleChangeForm={this.props.handleChangeForm}
          addItemToList={this.props.addItemToList}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(CreateOfferContents);
