import React from "react";

class EditItemDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      condition: "",
      tags: [],
      images: [],
      requestedItems: [],
      quantity: 1,
      errors: {
        title: "",
        description: "",
        category: "",
        condition: "",
        quantity: "",
      },
    };
  }
  render() {
    return <div>Editing</div>;
  }
}

export default EditItemDetailsPage;
