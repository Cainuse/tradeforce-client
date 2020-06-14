import React from "react";
import RatingComponent from "@material-ui/lab/Rating";

const Rating = ({ isReadOnly }) => {
  const [value, setValue] = React.useState(0);

  return (
    <RatingComponent
      name="simple-controlled"
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      readOnly={isReadOnly}
    />
  );
};

export default Rating;
