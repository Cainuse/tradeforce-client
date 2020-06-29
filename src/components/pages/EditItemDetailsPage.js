import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { categories, conditions } from "../../redux/constants/classifierTypes";

const useStyles = (theme) => ({
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  // header: {
  //   color: "orange",
  // },
});

class EditItemDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    const { itemDetail } = props;

    this.state = {
      ...itemDetail,
      errors: {
        title: "",
        description: "",
        category: "",
        condition: "",
        quantity: "",
      },
    };
  }

  redirect = () => {
    const { history, location } = this.props;
    const parentPath = location.pathname.substring(
      0,
      location.pathname.lastIndexOf("/")
    );
    history.push(parentPath);
  };

  onChange = () => {};

  addTag = () => {};

  deleteTag = () => {};

  render() {
    const { classes } = this.props;
    const {
      title,
      description,
      condition,
      category,
      quantity,
      tags,
      errors,
    } = this.state;
    return (
      <div>
        <div className={classes.buttonHeader}>
          <Button onClick={this.redirect}>&lt; Back to Posting</Button>
        </div>
        <Container>
          <Grid container className={classes.form} spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                label="Title"
                className={classes.textfield}
                fullWidth
                margin="dense"
                variant="outlined"
                name="title"
                onChange={this.onChange}
                defaultValue={title}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                multiline
                rows={4}
                label="Description"
                className={classes.textfield}
                fullWidth
                margin="dense"
                variant="outlined"
                name="description"
                onChange={this.onChange}
                defaultValue={description}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="outlined-select-category-native"
                select
                label="Category"
                margin="dense"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
                onChange={this.onChange}
                name="category"
                defaultValue={category}
                error={!!errors.category}
                helperText={errors.category}
              >
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="outlined-select-condition-native"
                select
                label="Condition"
                margin="dense"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
                onChange={this.onChange}
                name="condition"
                defaultValue={condition}
                error={!!errors.condition}
                helperText={errors.condition}
              >
                {conditions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tags"
                className={classes.textfield}
                fullWidth
                margin="dense"
                variant="outlined"
                name="tags"
                defaultValue=""
                onKeyUp={this.addTag}
                placeholder={
                  tags.length === 10
                    ? "Tag limit reached"
                    : "Press enter to add tag"
                }
                disabled={tags.length >= 10}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Quantity"
                className={classes.textfield}
                fullWidth
                margin="dense"
                variant="outlined"
                name="quantity"
                defaultValue={quantity}
                onChange={this.onChange}
                type="number"
                inputProps={{ min: "1" }}
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
            </Grid>
            {tags.map((tag, idx) => (
              <Chip
                key={idx}
                color="primary"
                size="small"
                onDelete={() => {
                  this.deleteTag("tags", idx);
                }}
                label={tag}
                className={classes.tags}
              />
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemDetail: state.itemDetail,
  };
};

export default connect(mapStateToProps)(
  withRouter(withStyles(useStyles)(EditItemDetailsPage))
);
