import React from "react";
import { withStyles } from "@material-ui/core/styles";


const useStyles = (theme) => ({
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
    fontSize: "5rem",
    color: theme.palette.text.disabled,
  },
  dropText: {
    fontWeight: 300,
    fontSize: "1.6rem",
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
});

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: false,
    };
  }

  setHighlighted = (value) => {
    this.setState({ highlighted: value });
  };

  processFiles = (files) => {
    let res = Array.from(files)
      .filter((file) => file.type === "image/png" || file.type === "image/jpeg")
      .map((file) => file.name);
    this.props.addImage(res);
  };

  render() {
    const { classes, images } = this.props;
    return (
      <React.Fragment>
        <div
          className={
            this.state.highlighted
              ? `${classes.dropzone} ${classes.dropzoneDrop}`
              : `${classes.dropzone}`
          }
          onDragEnter={() => this.setHighlighted(true)}
          onDragLeave={() => this.setHighlighted(false)}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            this.setHighlighted(false);
            this.processFiles(e.dataTransfer.files);
          }}
        >

            {/*<CloudUploadOutlinedIcon className={classes.uploadIcon} />*/}
            <h4 className={classes.dropText}>Drop image files here</h4>

          <label className={classes.browseButton}>
            <input
              type="file"
              multiple
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onChange={(e) => {
                this.processFiles(e.target.files);
              }}
              className={classes.input}
            />
            Browse
          </label>
        </div>
        <div className={classes.imageList}>
          {images.map((img, idx) => {
            return <p key={idx}>{img}</p>;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Step2);
