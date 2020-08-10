import React, { Component } from "react";

class Page extends Component {
  state = {};
  render() {
    return (
      <li className="page-item">
        <a onClick={this.props.onPagination} className="page-link" href="#@">
          1
        </a>
      </li>
    );
  }
}

export default Page;
