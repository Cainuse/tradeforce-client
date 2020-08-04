import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";

import Step1 from "../AddPosting/Step1";
import Step3 from "../AddPosting/Step3";
import {
  updateItemDetail,
  deletePosting,
  loadItemDetail,
} from "../../redux/actions/postingActions";
import ConfirmationDialog from "../ConfirmationDialog";
import ImageUpload from "../ImageUpload";
import { displayError } from "../../redux/actions/snackbarActions";
import { LOAD_EDIT_ITEM_DETAIL_PAGE_ERROR } from "../../redux/constants/snackbarMessageTypes";

const useStyles = makeStyles((theme) => ({
  buttonHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1),
  },
  section: {
    margin: theme.spacing(2, 0),
  },
  cancelButton: {
    color: "#AD343E",
    borderColor: "#AD343E",
  },
}));

const EditItemDetailsPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const itemDetail = useSelector((state) => state.itemDetail);

  const [itemDetailState, setItemDetailState] = useState({});
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    quantity: "",
  });
  const [changedFields, setChangedFields] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");

  let arrNewImgs = null;

  const reloadItemDetails = useCallback(async () => {
    let itemDetailsUrl = _.replace(location.pathname, "/edit", "");
    let postingId = _.split(itemDetailsUrl, "=")[1];

    let response = await dispatch(loadItemDetail(postingId));
    if (response.type === "success") {
      setItemDetailState(response.data);
    } else {
      history.goBack();
      dispatch(displayError(LOAD_EDIT_ITEM_DETAIL_PAGE_ERROR));
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (_.isEmpty(itemDetail)) {
      reloadItemDetails();
    } else {
      setItemDetailState(itemDetail);
    }
  }, []);

  const redirect = () => {
    history.goBack();
  };

  const isFormInvalid = () => {
    let requiredFields = _.pick(itemDetailState, [
      "title",
      "description",
      "category",
      "condition",
    ]);
    let haveEmptyFields = _.values(requiredFields).some(
      (val) => val.length === 0
    );
    let isQuantityInvalid = itemDetailState.quantity < 1;
    return isQuantityInvalid || haveEmptyFields;
  };

  const validateInput = ([key, value]) => {
    switch (key) {
      case "title":
        errors.title = value.length > 0 ? "" : "Title cannot be left blank";
        break;
      case "description":
        errors.description =
          value.length > 0 ? "" : "Description cannot be left blank";
        break;
      case "category":
        errors.category = value.length > 0 ? "" : "Category must be selected";
        break;
      case "condition":
        errors.condition = value.length > 0 ? "" : "Condition must be selected";
        break;
      case "quantity":
        errors.quantity = value > 0 ? "" : "Quantity must be greater than 0";
        break;
      default:
        break;
    }
    setErrors(errors);
  };

  const validateRequiredFields = () => {
    let requiredFields = _.toPairs(
      _.pick(itemDetailState, [
        "title",
        "description",
        "category",
        "condition",
        "quantity",
      ])
    );

    _.forEach(requiredFields, validateInput);

    return isFormInvalid();
  };

  const updateChangedFields = (field) => {
    if (!_.includes(changedFields, field)) {
      setChangedFields([...changedFields, field]);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    validateInput([name, value]);
    setItemDetailState({ ...itemDetailState, [name]: value });
    updateChangedFields(name);
  };

  const handleAddtoList = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setItemDetailState({
        ...itemDetailState,
        [e.target.name]: [...itemDetailState[e.target.name], e.target.value],
      });
      updateChangedFields(e.target.name);
      e.target.value = "";
    }
  };

  const handleRemoveFromList = (type, idx) => {
    let newTags = itemDetailState[type].filter((item, index) => index !== idx);
    setItemDetailState({ ...itemDetailState, [type]: newTags });
    updateChangedFields(type);
  };

  const handleAddImage = (list) => {
    if (!arrNewImgs) {
      arrNewImgs = itemDetailState.images;
    }

    arrNewImgs = [...arrNewImgs, ...list];

    setItemDetailState({
      ...itemDetailState,
      images: arrNewImgs,
    });

    updateChangedFields("images");
  };

  const handleSubmit = async () => {
    if (!validateRequiredFields()) {
      let details = _.pick(itemDetailState, changedFields);
      await dispatch(updateItemDetail(itemDetailState._id, details));
      redirect();
    } else {
      handleConfirmationOpen("alert");
    }
  };

  const handleDeletePosting = async () => {
    await dispatch(deletePosting(itemDetailState._id));
    history.go(-2);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setConfirmationType("");
  };

  const handleConfirmationOpen = (type) => {
    setConfirmationOpen(true);
    setConfirmationType(type);
  };

  const selectConfirmationToDisplay = () => {
    switch (confirmationType) {
      case "delete":
        return (
          <ConfirmationDialog
            open={confirmationOpen}
            submitAction={handleDeletePosting}
            submitName={"Delete"}
            dialogMessage={"This action cannot be undone"}
            dialogTitle={"Are you sure you want to delete this posting?"}
            handleClose={handleConfirmationClose}
          />
        );
      case "alert":
        return (
          <ConfirmationDialog
            open={confirmationOpen}
            submitAction={handleConfirmationClose}
            submitName={"OK"}
            dialogMessage={"Please fill required the fields"}
            dialogTitle={"Information is missing from the form"}
            handleClose={handleConfirmationClose}
            omitCancelButton={true}
          />
        );
      default:
        return (
          <ConfirmationDialog
            open={confirmationOpen}
            submitAction={redirect}
            submitName={"OK"}
            dialogMessage={"Any changes will not be saved"}
            dialogTitle={"Are you sure you want to leave this page?"}
            handleClose={handleConfirmationClose}
          />
        );
    }
  };

  if (_.isEmpty(itemDetailState) || !!arrNewImgs) {
    return null;
  }

  return (
    <div>
      {confirmationOpen && selectConfirmationToDisplay()}
      <div className={classes.buttonHeader}>
        <Button onClick={() => handleConfirmationOpen("redirect")}>
          &lt; Back to Posting
        </Button>
        <Button
          onClick={() => handleConfirmationOpen("delete")}
          startIcon={<DeleteIcon />}
          className={classes.cancelButton}
        >
          Delete Posting
        </Button>
      </div>
      <Container>
        <div className={classes.section}>
          <Step1
            change={handleInputChange}
            addTag={handleAddtoList}
            state={{ ...itemDetailState, errors }}
            deleteTag={handleRemoveFromList}
          />
        </div>
        <div className={classes.section}>
          <ImageUpload
            addImage={handleAddImage}
            images={itemDetailState.images}
            deleteImage={handleRemoveFromList}
          />
        </div>
        <div className={classes.section}>
          <Step3
            addRequest={handleAddtoList}
            deleteRequest={handleRemoveFromList}
            requests={itemDetailState.requestedItems}
          />
        </div>
        <div className={classes.buttonHeader}>
          <Button
            onClick={() => handleConfirmationOpen("redirect")}
            variant="outlined"
            className={classes.cancelButton}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default EditItemDetailsPage;
