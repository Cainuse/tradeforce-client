import React from "react";
import { AddItemSection } from "./AddItemSection";
import { Grid, Typography } from "@material-ui/core";
import { ItemListSection } from "./ItemListSection";

export const ItemSection = (props) => {
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
            <ItemListSection
              expandedPanelIdx={expandedPanelIdx}
              addedItems={props.addedItems}
              classes={props.classes}
              handleExpand={handleExpand}
            />
          </Grid>
        </Grid>

        <AddItemSection
          images={props.images}
          handleChangeForm={props.handleChangeForm}
          handleClickAddIcon={handleClickAddIcon}
          handleClickAddItem={handleClickAddItem}
          showForm={showForm}
        />
      </div>
    );
  }
};
