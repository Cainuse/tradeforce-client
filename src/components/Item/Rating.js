import React from "react";
import RatingComponent from "@material-ui/lab/Rating";

const Rating = ({ ratingMode }) => {
  const [value, setValue] = React.useState(0);

  return (
    <RatingComponent
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      readOnly={ratingMode}
    />
  );
};

export default Rating;
