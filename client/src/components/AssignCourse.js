import React, { Component } from "react";
import MultiSelectReact from "multi-select-react";

const options = [
  { value: false, label: "Chocolate" },
  { value: false, label: "Strawberry" },
  { value: false, label: "Vanilla" }
];

const selected = [1, 2];

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      multiSelect: []
    };
  }

  componentDidMount() {
    console.log(this.state.multiSelect);
  }
  render() {
    const selectedOptionsStyles = {
      color: "#3c763d",
      backgroundColor: "#dff0d8"
    };
    const optionsListStyles = {
      backgroundColor: "#dff0d8",
      color: "#3c763d"
    };
    return (
      <MultiSelectReact
        options={this.state.multiSelect}
        // optionClicked={this.optionClicked}
        selectedBadgeClicked={this.selectedBadgeClicked}
        options={options}
        selected={selected}
      />
    );
  }

  optionClicked = optionsList => {
    this.setState({ multiSelect: optionsList }, multiSelect => {
      console.log(multiSelect);
    });
  };
  selectedBadgeClicked = optionsList => {
    this.setState({ multiSelect: optionsList }, function() {
      console.log(optionsList);
    });
  };
}

export default MyComponent;
