import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import ReviewSection from "./ReviewSection";
import ItemDetailContainer from "./ItemDetailContainer";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { loadItemDetail } from "../../redux/actions/postingActions";

// Item Details page for in-depth view of offered items

const useStyles = (theme) => ({
  root: {
    fontFamily: "Montserrat",
  },
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
});

class ItemPage extends React.Component {
  async componentDidMount() {
    const itemId = this.props.location.pathname.split("=")[1];
    let response = await this.props.loadItemDetail(itemId);
    if (response === "error") {
      this.props.history.push("/OhNo!");
    }
  }

  redirect = async () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, itemDetail } = this.props;
    return Object.keys(itemDetail).length !== 0 ? (
      <div>
        <div className={classes.buttonHeader}>
          <Button onClick={this.redirect}>&lt; Back</Button>
        </div>
        <Container className={classes.root}>
          <ItemDetailContainer itemDetail={itemDetail} />
          <Divider className={classes.divider} />
          <ReviewSection itemDetail={itemDetail} />
        </Container>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  itemDetail: state.itemDetail,
});

export default connect(mapStateToProps, { loadItemDetail })(
  withRouter(withStyles(useStyles)(ItemPage))
);
