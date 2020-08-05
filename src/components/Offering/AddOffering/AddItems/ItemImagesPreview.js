import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { MobileStepper, Button } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = (theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    overflow: "hidden",
    display: "block",
    objectFit: "contain",
    width: "100%",
  },
  imgContainer: {
    maxWidth: "100%",
    height: "20rem",
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
  },
});

class ItemImagesPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  render() {
    let { images, classes } = this.props;
    let maxSteps = images.length;
    return (
      <div style={{ width: "100%" }}>
        <div className={classes.imgContainer}>
          <img
            className={classes.img}
            src={images[this.state.activeStep]}
            alt={`${this.state.activeStep}`}
          />
        </div>
        {maxSteps > 1 && (
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={this.state.activeStep}
            nextButton={
              <Button
                size="small"
                onClick={this.handleNext}
                disabled={
                  maxSteps === 0 || this.state.activeStep === maxSteps - 1
                }
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={this.handleBack}
                disabled={maxSteps === 0 || this.state.activeStep === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(ItemImagesPreview);
