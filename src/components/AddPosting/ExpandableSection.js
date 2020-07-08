import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  headingContainer: {
    "&:last-child": {
      paddingBottom: "16px",
    },
  },
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
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  expandIconContainer: {
    display: "inline-grid",
    justifyItems: "center",
    alignContent: "center",
  },
}));

const ExpandableSection = (props) => {
  const {
    returnToActiveStep,
    handleExpand,
    children,
    sectionTitle,
    panelIdx,
    expandedIdx,
  } = props;

  const classes = useStyles();

  let isExpanded = panelIdx === expandedIdx;

  return (
    <React.Fragment>
      <Grid
        container
        item
        alignContent={"flex-start"}
        className={classes.itemContainer}
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid item sm={12}>
            <Card>
              <Grid container alignContent={"center"} justify={"center"}>
                <Grid item xs={11}>
                  <CardContent className={classes.headingContainer}>
                    <Grid container alignContent={"center"}>
                      <Grid container item xs={12}>
                        <Typography className={classes.heading}>
                          {sectionTitle}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Grid>

                <Grid item xs={1} className={classes.expandIconContainer}>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: isExpanded,
                    })}
                    onClick={() => {
                      handleExpand(panelIdx);
                    }}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>
              </Grid>

              <Collapse in={isExpanded}>
                <CardContent>{children}</CardContent>
                <Divider />
                <Grid container item xs={12} justify={"flex-end"}>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        returnToActiveStep(sectionTitle);
                      }}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Grid>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ExpandableSection;
