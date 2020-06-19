import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { AddItemOffering } from "./AddItemForm";

const useStyles = (theme) => ({
  formSection: {
    marginBottom: "20px",
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
                // onChange={change}
                // defaultValue={description}
                // error={!!errors.description}
                // helperText={errors.description}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.formSection}>
          <AddItemOffering images={this.props.images}/>
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(CreateOfferContents);