import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    position: "relative",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 0,
  },
  reviewContainer: {
    display: "inline-block",
    width: "100%",
    minHeight: "270px",
    padding: theme.spacing(4, 0),
  },
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
  },
  cancelButton: {
    color: "#AD343E",
    borderColor: "#AD343E",
  },
  rating: {
    marginLeft: theme.spacing(2),
  },
});

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      rating: 0,
      review: "",
    };
  }

  handleInputChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    console.log("submit");
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography align="center" variant="h4">
          Create A Review
        </Typography>
        <Grid container spacing={1} className={classes.reviewContainer}>
          {/* <Grid item xs={2} className={classes.rateText}>
            Rate this user:
          </Grid> */}
          <Grid item className={classes.ratingContainer} xs={6}>
            <Typography variant="subtitle1">Rate this user:</Typography>
            <Rating
              name="rating"
              value={this.state.rating}
              precision={0.5}
              onChange={this.handleInputChange}
              size="large"
              className={classes.rating}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Title"
              className={classes.textfield}
              margin="dense"
              variant="outlined"
              name="title"
              onChange={this.handleInputChange}
              defaultValue={this.state.title}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              rows={4}
              label="Review"
              className={classes.textfield}
              fullWidth
              margin="dense"
              variant="outlined"
              name="review"
              onChange={this.handleInputChange}
              defaultValue={this.state.details}
            />
          </Grid>
        </Grid>
        <div className={classes.buttonHeader}>
          <Button
            onClick={() => console.log("close")}
            variant="outlined"
            className={classes.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(AddReview);
