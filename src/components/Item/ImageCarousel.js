import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
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
    width: "100%",
  },
});

class ImageCarousel extends React.Component {
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
      <div>
        <img
          className={classes.img}
          src={
            maxSteps === 0
              ? require(`../../images/default.jpg`)
              : require(`../../images/${images[this.state.activeStep].name}`)
          }
          alt={`${this.state.activeStep}`}
        />
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
                disabled={this.state.activeStep === maxSteps - 1}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={this.handleBack}
                disabled={this.state.activeStep === 0}
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

export default withStyles(useStyles)(ImageCarousel);