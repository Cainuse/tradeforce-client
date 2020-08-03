import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import clsx from "clsx";
import { TOO_MANY_IMAGES_ERROR } from "../redux/constants/snackbarMessageTypes";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.text.disabled}`,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  dropzoneDrop: {
    backgroundColor: "#DBEAF8",
    border: `2px dashed ${theme.palette.info.main}`,
  },
  uploadIcon: {
    fontSize: "8rem",
    color: theme.palette.text.disabled,
  },
  dropText: {
    fontWeight: 300,
    fontSize: "2rem",
    color: theme.palette.text.secondary,
  },
  browseButton: {
    color: theme.palette.info.main,
    border: `1px solid ${theme.palette.info.main}`,
    fontSize: "0.875rem",
    lineHeight: "1.75",
    borderRadius: "4px",
    textTransform: "uppercase",
    padding: "5px 15px",
    boxSizing: "border-box",
    cursor: "pointer",
  },
  input: {
    display: "none",
  },
  imgPreview: {
    height: 100,
  },
  imgContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  deleteButton: {
    margin: 0,
    padding: 0,
    position: "absolute",
    right: "0",
    top: "0",
    color: "red",
  },
  imgDiv: {
    margin: theme.spacing(1),
    position: "relative",
  },
  uploadIconSmall: {
    fontSize: "5rem",
    color: theme.palette.text.disabled,
  },
  dropTextSmall: {
    fontWeight: 300,
    fontSize: "1.6rem",
    color: theme.palette.text.secondary,
  },
}));

const ImageUpload = ({ images, addImage, deleteImage, isSmall = false }) => {
  const [highlighted, setHighlighted] = useState(false);
  const [limitError, setLimitError] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const classes = useStyles();

  const isValidFile = (file) => {
    let isValid = true;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setTypeError(true);
      isValid = false;
    }
    let fileSize = file.size / 1024 / 1024;
    if (fileSize > 1) {
      setSizeError(true);
      isValid = false;
    }
    return isValid;
  };

  const isWithinLimit = ({ index, spaceAvailable }) => {
    let isValid = true;
    if (index >= spaceAvailable) {
      setLimitError(true);
      isValid = false;
    }
    return isValid;
  };

  const processFiles = (files) => {
    setTypeError(false);
    setSizeError(false);
    let spaceAvailable = 5 - images.length;
    Array.from(files)
      .filter((file) => isValidFile(file))
      .filter((file, index) => isWithinLimit({ index, spaceAvailable }))
      .forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          addImage([reader.result]);
        };
        reader.readAsDataURL(file);
      });
  };

  const renderErrorMessages = () => {
    return (
      <div>
        {limitError && <p>{TOO_MANY_IMAGES_ERROR}</p>}
        {sizeError && (
          <p>
            Some images were not uploaded because they exceeded the 1MB size
            limit
          </p>
        )}
        {typeError && (
          <p>
            Some images were not uploaded because they were not a PNG or JPG
            file
          </p>
        )}
      </div>
    );
  };

  const handleDeleteChange = (index) => {
    if (images.length - 1 < 5) {
      setLimitError(false);
    }
    setSizeError(false);
    setTypeError(false);
    deleteImage("images", index);
  };

  return (
    <React.Fragment>
      <div
        className={clsx(classes.dropzone, {
          [classes.dropzoneDrop]: highlighted,
        })}
        onDragEnter={() => setHighlighted(true)}
        onDragLeave={() => setHighlighted(false)}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);
          processFiles(e.dataTransfer.files);
        }}
      >
        <CloudUploadOutlinedIcon
          className={clsx({
            [classes.uploadIcon]: !isSmall,
            [classes.uploadIconSmall]: isSmall,
          })}
        />
        <h4
          className={clsx({
            [classes.dropText]: !isSmall,
            [classes.dropTextSmall]: isSmall,
          })}
        >
          Drop your files here
        </h4>
        <label className={classes.browseButton}>
          <input
            type="file"
            multiple
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={(e) => {
              processFiles(e.target.files);
            }}
            className={classes.input}
          />
          Browse
        </label>
      </div>
      {renderErrorMessages()}
      <div className={classes.imgContainer}>
        {images.map((img, idx) => {
          return (
            <div key={idx} className={classes.imgDiv}>
              <img src={img} alt="something" className={classes.imgPreview} />
              <IconButton
                aria-label="delete image"
                component="span"
                className={classes.deleteButton}
                onClick={() => {
                  handleDeleteChange(idx);
                }}
              >
                <ClearIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ImageUpload;
