import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import Check from "@material-ui/icons/Check";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

const steps = ["step1", "step2", "step3", "step4", "step5"];

const useStyles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "75%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class AddPosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      open: false,
    };
  }

  setActiveStep = (step) => {
    console.log("setActiveStep: ", step);
    this.setState({ activeStep: step });
  };

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setActiveStep(0);
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <button type="button" onClick={this.handleOpen}>
          Open Modal
        </button>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.modal}
        >
          <Paper className={classes.paper}>
            <div>Modal Stuff</div>
            <Stepper activeStep={this.state.activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              <Button
                disabled={this.state.activeStep === 0}
                onClick={this.handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                {this.state.activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    );
  }
}

export default withStyles(useStyles)(AddPosting);
