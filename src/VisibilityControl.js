import React, { Component } from "react";

export default class VisibilityControl extends Component {
  render() {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={this.props.isChecked}
          onChange={e => this.props.callback(e.target.checked)}
        />
        <label className="form-check-label">
          show {this.props.description}
        </label>
      </div>
    );
  }
}
