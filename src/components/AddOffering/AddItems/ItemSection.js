import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ItemListSection } from "./ItemListSection";
import { AddItemSection } from "./AddItemSection";

export const ItemSection = (props) => {
  let {addedItems, item} = props.state;

  const [expandedPanelIdx, setExpandedIdx] = React.useState(-1);
  const [showForm, setShowForm] = React.useState(
    addedItems.length === 0 ? true : false
  );

  const handleExpand = (index) => {
    expandedPanelIdx === index ? setExpandedIdx(-1) : setExpandedIdx(index);
  };

  const handleClickAddItem = () => {
    let isValid = props.validateItemFields();
    if (isValid){
      props.addItemToList();
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleClickAddIcon = () => {
    setShowForm(true);
  };

  if (addedItems.length === 0) {
    return (
      <div className={props.classes.formSection}>
        <AddItemSection
          item={item}
          state={props.state}
          handleChangeForm={props.handleChange}
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

          <Grid container spacing={1} direction={"row"}>
            <ItemListSection
              expandedPanelIdx={expandedPanelIdx}
              addedItems={addedItems}
              classes={props.classes}
              handleExpand={handleExpand}
            />
          </Grid>
        </Grid>

        <AddItemSection
          state={props.state}
          handleChangeForm={props.handleChange}
          handleClickAddIcon={handleClickAddIcon}
          handleClickAddItem={handleClickAddItem}
          showForm={showForm}
        />
      </div>
    );
  }
};
