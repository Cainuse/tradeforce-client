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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
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
});

class OfferingContents extends React.Component {
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

export default withStyles(useStyles)(OfferingContents);
