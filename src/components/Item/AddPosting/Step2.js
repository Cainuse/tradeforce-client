import React from "react";
import ImageUpload from "../../shared/ImageUpload";

const Step2 = ({ addImage, images, deleteImage }) => {
  return (
    <ImageUpload
      addImage={addImage}
      images={images}
      deleteImage={deleteImage}
    />
  );
};

export default Step2;
