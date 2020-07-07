import React from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { ItemSection } from "./AddItems/ItemSection";

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
  commentTxtbox: {
    minWidth: "600px",
  },
});

class OfferingContents extends React.Component {
  render() {
    const { classes, state } = this.props;

    return (
      <div className={classes.form}>
        <div className={classes.formSection}>
          <Typography variant="h6" className={classes.formHeader}>
            Comment
          </Typography>

          <Grid container spacing={1} className={classes.commentTxtbox}>
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
                value={this.props.state.comment}
                onChange={this.props.handleChangeCommentInput}
                error={!!state.errors.comment}
                helperText={state.errors.comment}
              />
            </Grid>
          </Grid>
        </div>

        <ItemSection
          classes={classes}
          state={this.props.state}
          addItemToList={this.props.addItemToList}
          handleChange={this.props.handleChangeAddItemInputs}
          addImage={this.props.addImage}
          deleteImage={this.props.deleteImage}
          validateItemFields={this.props.validateItemFields}
          deleteItemFromList={this.props.deleteItemFromList}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(OfferingContents);
