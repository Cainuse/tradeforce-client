import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ItemDetailsReview from "./ItemDetailsReview";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 300,
    fontSize: "1.2rem",
  },
  chips: {
    margin: theme.spacing(0.5),
  },
  staticTitle: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    textTransform: "uppercase",
  },
}));

const Step4 = (props) => {
  const { state, returnToActiveStep } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Items Details</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ItemDetailsReview state={state} />
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            size="small"
            color="primary"
            onClick={() => returnToActiveStep(0)}
          >
            Edit
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Images</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            {state.images.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            size="small"
            color="primary"
            onClick={() => returnToActiveStep(1)}
          >
            Edit
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Requested Items</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {state.requestedItems.map((item, idx) => (
            <Chip
              key={idx}
              color="primary"
              variant="outlined"
              label={item}
              className={classes.chips}
            />
          ))}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            size="small"
            color="primary"
            onClick={() => returnToActiveStep(2)}
          >
            Edit
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default Step4;
