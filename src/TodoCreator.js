import React, { Component } from "react";

export default class TodoCreator extends Component {
  state = { newItemText: "" };

  updateNewTextValue = e => {
    this.setState({ newItemText: e.target.value });
  };

  createNewTodo = () => {
    this.props.callback(this.state.newItemText);
    this.setState({ newItemText: "" });
  };

  render() {
    return (
      <div>
        <div className="my-1">
          <input
            className="form-control"
            value={this.state.newItemText}
            onChange={this.updateNewTextValue}
          />
          <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>
            Add
          </button>
        </div>
      </div>
    );
  }
}
