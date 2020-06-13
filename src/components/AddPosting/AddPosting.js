import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import FinalStep from "./FinalStep";

const steps = [
  "Add Posting Details",
  "Upload Photos",
  "Add What You're Looking For",
];

const useStyles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    height: "450px",
    position: "relative",
  },
  modalHeader: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    fontSize: "1.5rem",
    fontWeight: 400,
    marginBottom: theme.spacing(1),
  },
  form: {
    display: "inline-block",
    width: "100%",
    height: "300px",
  },
  header: {
    display: "inline-block",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});

class AddPosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      open: true,
      title: "",
      description: "",
      category: "",
      condition: "",
      tags: [],
      images: [],
    };
  }

  handleInputChange = (e) => {
    let { name, value } = e.target;

    this.setState({ [name]: value });
  };

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
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Paper className={classes.paper}>
            <Grid container direction="column">
              <Grid item className={classes.modalHeader}>
                Create New Posting
              </Grid>
              <Grid item>
                <form className={classes.form}>
                  {this.state.activeStep === 0 && (
                    <Step1 change={this.handleInputChange} />
                  )}
                  {this.state.activeStep === 1 && (
                    <Step2 change={this.handleInputChange} />
                  )}
                  {this.state.activeStep === 2 && (
                    <Step3 change={this.handleInputChange} />
                  )}
                  {this.state.activeStep === 3 && (
                    <FinalStep change={this.handleInputChange} />
                  )}
                </form>
              </Grid>
              <Grid item>
                <div className={classes.stepper}>
                  <Stepper activeStep={this.state.activeStep}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <div className={classes.buttonContainer}>
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
                      {this.state.activeStep === steps.length - 1
                        ? "Submit"
                        : "Next"}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
      </div>
    );
  }
}

export default withStyles(useStyles)(AddPosting);
